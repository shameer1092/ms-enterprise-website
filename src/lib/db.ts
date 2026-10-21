import fs from 'fs';
import path from 'path';
import {
  DatabaseSchema,
  SiteSettings,
  SiteContent,
  ServiceItem,
  ProjectItem,
  PlanItem,
  CustomPageItem,
  InquiryItem,
  FaqItem,
  NavItemConfig,
  User,
  AuditLogItem,
  MediaItem,
} from '@/types';
import { defaultDatabase } from './default-data';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'ms_database.json');
const BACKUPS_DIR = path.join(DATA_DIR, 'backups');

// Ensure data directories exist
function ensureDirs() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(BACKUPS_DIR)) {
    fs.mkdirSync(BACKUPS_DIR, { recursive: true });
  }
}

// Read database with fallback to default data
export function getDatabase(): DatabaseSchema {
  ensureDirs();
  if (!fs.existsSync(DB_FILE)) {
    saveDatabase(defaultDatabase);
    return JSON.parse(JSON.stringify(defaultDatabase));
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    // Merge missing top-level keys if schema was updated
    return {
      settings: { ...defaultDatabase.settings, ...(parsed.settings || {}) },
      content: { ...defaultDatabase.content, ...(parsed.content || {}) },
      services: parsed.services || defaultDatabase.services,
      projects: parsed.projects || defaultDatabase.projects,
      plans: parsed.plans || defaultDatabase.plans,
      pages: parsed.pages || defaultDatabase.pages,
      inquiries: parsed.inquiries || defaultDatabase.inquiries,
      faqs: parsed.faqs || defaultDatabase.faqs,
      navigation: parsed.navigation || defaultDatabase.navigation,
      users: parsed.users || defaultDatabase.users,
      auditLogs: parsed.auditLogs || defaultDatabase.auditLogs,
      media: parsed.media || defaultDatabase.media,
    };
  } catch (error) {
    console.error('Failed to read database, returning default:', error);
    return JSON.parse(JSON.stringify(defaultDatabase));
  }
}

// Atomically save database
export function saveDatabase(data: DatabaseSchema): void {
  ensureDirs();
  const serialized = JSON.stringify(data, null, 2);
  try {
    fs.writeFileSync(DB_FILE, serialized, 'utf-8');
  } catch (err) {
    console.error('Failed to write database file:', err);
  }
}

// ---------------------- SETTINGS & CONTENT ----------------------
export function getSettings(): SiteSettings {
  return getDatabase().settings;
}

export function updateSettings(partial: Partial<SiteSettings>, username = 'admin'): SiteSettings {
  const db = getDatabase();
  db.settings = { ...db.settings, ...partial };
  logAuditInternal(db, 'UPDATE_SETTINGS', username, 'Updated site settings.');
  saveDatabase(db);
  return db.settings;
}

export function getContent(): SiteContent {
  return getDatabase().content;
}

export function updateContent(partial: Partial<SiteContent>, username = 'admin'): SiteContent {
  const db = getDatabase();
  db.content = { ...db.content, ...partial };
  logAuditInternal(db, 'UPDATE_CONTENT', username, 'Updated site front-end content.');
  saveDatabase(db);
  return db.content;
}

// ---------------------- SERVICES ----------------------
export function getServices(includeUnpublished = false): ServiceItem[] {
  const db = getDatabase();
  const list = includeUnpublished ? db.services : db.services.filter((s) => s.published);
  return list.sort((a, b) => a.order - b.order);
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  const db = getDatabase();
  return db.services.find((s) => s.slug === slug);
}

export function saveService(serviceData: Partial<ServiceItem>, username = 'admin'): ServiceItem {
  const db = getDatabase();
  const now = new Date().toISOString();
  let saved: ServiceItem;

  if (serviceData.id) {
    const idx = db.services.findIndex((s) => s.id === serviceData.id);
    if (idx >= 0) {
      saved = {
        ...db.services[idx],
        ...serviceData,
        updatedAt: now,
      } as ServiceItem;
      db.services[idx] = saved;
      logAuditInternal(db, 'UPDATE_SERVICE', username, `Updated service: ${saved.title}`);
    } else {
      saved = {
        ...serviceData,
        id: serviceData.id,
        createdAt: now,
        updatedAt: now,
      } as ServiceItem;
      db.services.push(saved);
      logAuditInternal(db, 'CREATE_SERVICE', username, `Created service: ${saved.title}`);
    }
  } else {
    saved = {
      ...serviceData,
      id: `srv-${Date.now()}`,
      order: db.services.length + 1,
      published: serviceData.published !== undefined ? serviceData.published : true,
      showInNav: serviceData.showInNav !== undefined ? serviceData.showInNav : true,
      createdAt: now,
      updatedAt: now,
    } as ServiceItem;
    db.services.push(saved);
    logAuditInternal(db, 'CREATE_SERVICE', username, `Created service: ${saved.title}`);
  }

  syncDynamicNavigation(db);
  saveDatabase(db);
  return saved;
}

export function deleteService(id: string, username = 'admin'): boolean {
  const db = getDatabase();
  const initialLen = db.services.length;
  const target = db.services.find((s) => s.id === id);
  db.services = db.services.filter((s) => s.id !== id);

  if (db.services.length < initialLen) {
    logAuditInternal(db, 'DELETE_SERVICE', username, `Deleted service: ${target?.title || id}`);
    syncDynamicNavigation(db);
    saveDatabase(db);
    return true;
  }
  return false;
}

// ---------------------- PROJECTS ----------------------
export function getProjects(includeUnpublished = false): ProjectItem[] {
  const db = getDatabase();
  const list = includeUnpublished ? db.projects : db.projects.filter((p) => p.published);
  return list.sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  const db = getDatabase();
  return db.projects.find((p) => p.slug === slug);
}

export function saveProject(projectData: Partial<ProjectItem>, username = 'admin'): ProjectItem {
  const db = getDatabase();
  const now = new Date().toISOString();
  let saved: ProjectItem;

  if (projectData.id) {
    const idx = db.projects.findIndex((p) => p.id === projectData.id);
    if (idx >= 0) {
      saved = {
        ...db.projects[idx],
        ...projectData,
        updatedAt: now,
      } as ProjectItem;
      db.projects[idx] = saved;
      logAuditInternal(db, 'UPDATE_PROJECT', username, `Updated project: ${saved.title}`);
    } else {
      saved = {
        ...projectData,
        id: projectData.id,
        createdAt: now,
        updatedAt: now,
      } as ProjectItem;
      db.projects.push(saved);
      logAuditInternal(db, 'CREATE_PROJECT', username, `Created project: ${saved.title}`);
    }
  } else {
    saved = {
      ...projectData,
      id: `proj-${Date.now()}`,
      order: db.projects.length + 1,
      published: projectData.published !== undefined ? projectData.published : true,
      showInNav: projectData.showInNav !== undefined ? projectData.showInNav : true,
      createdAt: now,
      updatedAt: now,
    } as ProjectItem;
    db.projects.push(saved);
    logAuditInternal(db, 'CREATE_PROJECT', username, `Created project: ${saved.title}`);
  }

  syncDynamicNavigation(db);
  saveDatabase(db);
  return saved;
}

export function deleteProject(id: string, username = 'admin'): boolean {
  const db = getDatabase();
  const initialLen = db.projects.length;
  const target = db.projects.find((p) => p.id === id);
  db.projects = db.projects.filter((p) => p.id !== id);

  if (db.projects.length < initialLen) {
    logAuditInternal(db, 'DELETE_PROJECT', username, `Deleted project: ${target?.title || id}`);
    syncDynamicNavigation(db);
    saveDatabase(db);
    return true;
  }
  return false;
}

// ---------------------- PLANS ----------------------
export function getPlans(includeUnpublished = false): PlanItem[] {
  const db = getDatabase();
  const list = includeUnpublished ? db.plans : db.plans.filter((p) => p.published);
  return list.sort((a, b) => a.order - b.order);
}

export function savePlan(planData: Partial<PlanItem>, username = 'admin'): PlanItem {
  const db = getDatabase();
  const now = new Date().toISOString();
  let saved: PlanItem;

  if (planData.id) {
    const idx = db.plans.findIndex((p) => p.id === planData.id);
    if (idx >= 0) {
      saved = {
        ...db.plans[idx],
        ...planData,
        updatedAt: now,
      } as PlanItem;
      db.plans[idx] = saved;
      logAuditInternal(db, 'UPDATE_PLAN', username, `Updated plan: ${saved.name}`);
    } else {
      saved = {
        ...planData,
        id: planData.id,
        createdAt: now,
        updatedAt: now,
      } as PlanItem;
      db.plans.push(saved);
      logAuditInternal(db, 'CREATE_PLAN', username, `Created plan: ${saved.name}`);
    }
  } else {
    saved = {
      ...planData,
      id: `plan-${Date.now()}`,
      order: db.plans.length + 1,
      published: planData.published !== undefined ? planData.published : true,
      createdAt: now,
      updatedAt: now,
    } as PlanItem;
    db.plans.push(saved);
    logAuditInternal(db, 'CREATE_PLAN', username, `Created plan: ${saved.name}`);
  }

  saveDatabase(db);
  return saved;
}

export function deletePlan(id: string, username = 'admin'): boolean {
  const db = getDatabase();
  const initialLen = db.plans.length;
  const target = db.plans.find((p) => p.id === id);
  db.plans = db.plans.filter((p) => p.id !== id);

  if (db.plans.length < initialLen) {
    logAuditInternal(db, 'DELETE_PLAN', username, `Deleted plan: ${target?.name || id}`);
    saveDatabase(db);
    return true;
  }
  return false;
}

// ---------------------- PAGES ----------------------
export function getPages(includeUnpublished = false): CustomPageItem[] {
  const db = getDatabase();
  const list = includeUnpublished ? db.pages : db.pages.filter((p) => p.published);
  return list.sort((a, b) => a.navOrder - b.navOrder);
}

export function getPageBySlug(slug: string): CustomPageItem | undefined {
  const db = getDatabase();
  return db.pages.find((p) => p.slug === slug);
}

export function savePage(pageData: Partial<CustomPageItem>, username = 'admin'): CustomPageItem {
  const db = getDatabase();
  const now = new Date().toISOString();
  let saved: CustomPageItem;

  if (pageData.id) {
    const idx = db.pages.findIndex((p) => p.id === pageData.id);
    if (idx >= 0) {
      saved = {
        ...db.pages[idx],
        ...pageData,
        updatedAt: now,
      } as CustomPageItem;
      db.pages[idx] = saved;
      logAuditInternal(db, 'UPDATE_PAGE', username, `Updated page: ${saved.title}`);
    } else {
      saved = {
        ...pageData,
        id: pageData.id,
        createdAt: now,
        updatedAt: now,
      } as CustomPageItem;
      db.pages.push(saved);
      logAuditInternal(db, 'CREATE_PAGE', username, `Created page: ${saved.title}`);
    }
  } else {
    saved = {
      ...pageData,
      id: `page-${Date.now()}`,
      navOrder: db.pages.length + 1,
      published: pageData.published !== undefined ? pageData.published : true,
      createdAt: now,
      updatedAt: now,
    } as CustomPageItem;
    db.pages.push(saved);
    logAuditInternal(db, 'CREATE_PAGE', username, `Created page: ${saved.title}`);
  }

  syncDynamicNavigation(db);
  saveDatabase(db);
  return saved;
}

export function deletePage(id: string, username = 'admin'): boolean {
  const db = getDatabase();
  const initialLen = db.pages.length;
  const target = db.pages.find((p) => p.id === id);
  db.pages = db.pages.filter((p) => p.id !== id);

  if (db.pages.length < initialLen) {
    logAuditInternal(db, 'DELETE_PAGE', username, `Deleted page: ${target?.title || id}`);
    syncDynamicNavigation(db);
    saveDatabase(db);
    return true;
  }
  return false;
}

// ---------------------- FAQS ----------------------
export function getFaqs(includeUnpublished = false): FaqItem[] {
  const db = getDatabase();
  const list = includeUnpublished ? db.faqs : db.faqs.filter((f) => f.published);
  return list.sort((a, b) => a.order - b.order);
}

export function saveFaq(faqData: Partial<FaqItem>, username = 'admin'): FaqItem {
  const db = getDatabase();
  let saved: FaqItem;

  if (faqData.id) {
    const idx = db.faqs.findIndex((f) => f.id === faqData.id);
    if (idx >= 0) {
      saved = { ...db.faqs[idx], ...faqData } as FaqItem;
      db.faqs[idx] = saved;
      logAuditInternal(db, 'UPDATE_FAQ', username, `Updated FAQ: ${saved.question}`);
    } else {
      saved = { ...faqData, id: faqData.id } as FaqItem;
      db.faqs.push(saved);
      logAuditInternal(db, 'CREATE_FAQ', username, `Created FAQ: ${saved.question}`);
    }
  } else {
    saved = {
      ...faqData,
      id: `faq-${Date.now()}`,
      order: db.faqs.length + 1,
      published: faqData.published !== undefined ? faqData.published : true,
    } as FaqItem;
    db.faqs.push(saved);
    logAuditInternal(db, 'CREATE_FAQ', username, `Created FAQ: ${saved.question}`);
  }

  saveDatabase(db);
  return saved;
}

export function deleteFaq(id: string, username = 'admin'): boolean {
  const db = getDatabase();
  const initialLen = db.faqs.length;
  const target = db.faqs.find((f) => f.id === id);
  db.faqs = db.faqs.filter((f) => f.id !== id);

  if (db.faqs.length < initialLen) {
    logAuditInternal(db, 'DELETE_FAQ', username, `Deleted FAQ: ${target?.question || id}`);
    saveDatabase(db);
    return true;
  }
  return false;
}

// ---------------------- INQUIRIES ----------------------
export function getInquiries(): InquiryItem[] {
  const db = getDatabase();
  return [...db.inquiries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function addInquiry(data: Omit<InquiryItem, 'id' | 'createdAt' | 'status'>): InquiryItem {
  const db = getDatabase();
  const item: InquiryItem = {
    ...data,
    id: `inq-${Date.now()}`,
    status: 'unread',
    createdAt: new Date().toISOString(),
  };
  db.inquiries.unshift(item);
  logAuditInternal(db, 'NEW_INQUIRY', 'public', `New inquiry from ${item.name} (${item.email})`);
  saveDatabase(db);
  return item;
}

export function updateInquiryStatus(
  id: string,
  status: InquiryItem['status'],
  adminNotes?: string,
  username = 'admin'
): InquiryItem | undefined {
  const db = getDatabase();
  const inq = db.inquiries.find((i) => i.id === id);
  if (inq) {
    inq.status = status;
    if (adminNotes !== undefined) {
      inq.adminNotes = adminNotes;
    }
    logAuditInternal(db, 'UPDATE_INQUIRY', username, `Marked inquiry ${id} as ${status}`);
    saveDatabase(db);
    return inq;
  }
  return undefined;
}

export function deleteInquiry(id: string, username = 'admin'): boolean {
  const db = getDatabase();
  const initialLen = db.inquiries.length;
  db.inquiries = db.inquiries.filter((i) => i.id !== id);

  if (db.inquiries.length < initialLen) {
    logAuditInternal(db, 'DELETE_INQUIRY', username, `Deleted inquiry: ${id}`);
    saveDatabase(db);
    return true;
  }
  return false;
}

// ---------------------- USERS & AUTH ----------------------
export function getUsers(): Omit<User, 'passwordHash' | 'twoFactorSecret'>[] {
  const db = getDatabase();
  return db.users.map(({ passwordHash, twoFactorSecret, ...rest }) => rest);
}

export function getUserByUsername(username: string): User | undefined {
  const db = getDatabase();
  return db.users.find((u) => u.username.toLowerCase() === username.toLowerCase());
}

export function getUserById(id: string): User | undefined {
  const db = getDatabase();
  return db.users.find((u) => u.id === id);
}

export function saveUser(userData: Partial<User>, username = 'admin'): User {
  const db = getDatabase();
  let saved: User;

  if (userData.id) {
    const idx = db.users.findIndex((u) => u.id === userData.id);
    if (idx >= 0) {
      saved = { ...db.users[idx], ...userData };
      db.users[idx] = saved;
      logAuditInternal(db, 'UPDATE_USER', username, `Updated user account: ${saved.username}`);
    } else {
      saved = { ...userData, id: userData.id } as User;
      db.users.push(saved);
      logAuditInternal(db, 'CREATE_USER', username, `Created user account: ${saved.username}`);
    }
  } else {
    saved = {
      ...userData,
      id: `usr-${Date.now()}`,
      createdAt: new Date().toISOString(),
      role: userData.role || 'editor',
      twoFactorEnabled: false,
    } as User;
    db.users.push(saved);
    logAuditInternal(db, 'CREATE_USER', username, `Created user account: ${saved.username}`);
  }

  saveDatabase(db);
  return saved;
}

export function deleteUser(id: string, username = 'admin'): boolean {
  const db = getDatabase();
  const target = db.users.find((u) => u.id === id);
  if (!target) return false;
  if (target.role === 'owner' && db.users.filter((u) => u.role === 'owner').length <= 1) {
    throw new Error('Cannot delete the last Owner account.');
  }

  db.users = db.users.filter((u) => u.id !== id);
  logAuditInternal(db, 'DELETE_USER', username, `Deleted user account: ${target.username}`);
  saveDatabase(db);
  return true;
}

// ---------------------- DYNAMIC NAVIGATION ----------------------
// Section 4 requirement: Dynamic navigation
// "When a new project or service is added from the admin panel, a matching button is automatically
// created in the navbar. Any new pages created under it appear as sub-items. Admin can control menu order, visibility, and labels."
export function syncDynamicNavigation(db: DatabaseSchema): void {
  const publishedServices = db.services.filter((s) => s.published && s.showInNav);
  const publishedProjects = db.projects.filter((p) => p.published && p.showInNav);
  const publishedPages = db.pages.filter((p) => p.published && p.showInNav);

  // Check or create Services top-level menu
  let srvNav = db.navigation.find((n) => n.id === 'nav-services');
  if (!srvNav) {
    srvNav = {
      id: 'nav-services',
      label: 'Services',
      href: '/services',
      order: 3,
      visible: true,
      children: [],
    };
    db.navigation.push(srvNav);
  } else {
    srvNav.href = '/services';
  }

  // Build service child items
  srvNav.children = publishedServices.map((s, idx) => ({
    id: `nav-srv-${s.id}`,
    label: s.title,
    href: `/services/${s.slug}`,
    order: idx + 1,
    visible: true,
  }));

  // Check or create Projects top-level menu if projects exist
  let projNav = db.navigation.find((n) => n.id === 'nav-projects');
  if (publishedProjects.length > 0) {
    if (!projNav) {
      projNav = {
        id: 'nav-projects',
        label: 'Projects',
        href: `/projects/${publishedProjects[0].slug}`,
        order: 4,
        visible: true,
        children: [],
      };
      db.navigation.push(projNav);
    }
    projNav.children = publishedProjects.map((p, idx) => ({
      id: `nav-proj-${p.id}`,
      label: p.title,
      href: `/projects/${p.slug}`,
      order: idx + 1,
      visible: true,
    }));
  } else if (projNav) {
    projNav.visible = false;
  }

  // Attach pages created under parents or as standalone
  publishedPages.forEach((page) => {
    if (page.parentNavId) {
      // Find parent in navigation
      const parent = db.navigation.find((n) => n.id === page.parentNavId);
      if (parent) {
        if (!parent.children) parent.children = [];
        if (!parent.children.some((c) => c.href === `/p/${page.slug}`)) {
          parent.children.push({
            id: `nav-page-${page.id}`,
            label: page.navLabel || page.title,
            href: `/p/${page.slug}`,
            order: parent.children.length + 1,
            visible: true,
          });
        }
      }
    } else {
      // Standalone navbar item
      if (!db.navigation.some((n) => n.href === `/p/${page.slug}`)) {
        db.navigation.push({
          id: `nav-page-${page.id}`,
          label: page.navLabel || page.title,
          href: `/p/${page.slug}`,
          order: db.navigation.length + 1,
          visible: true,
          isCustom: true,
        });
      }
    }
  });

  // Sort navigation items by order
  db.navigation.sort((a, b) => a.order - b.order);
}

export function getNavigation(): NavItemConfig[] {
  const db = getDatabase();
  return db.navigation.filter((n) => n.visible);
}

export function updateNavigationConfig(navs: NavItemConfig[], username = 'admin'): NavItemConfig[] {
  const db = getDatabase();
  db.navigation = navs;
  logAuditInternal(db, 'UPDATE_NAV', username, 'Updated navigation hierarchy and order.');
  saveDatabase(db);
  return db.navigation;
}

// ---------------------- AUDIT LOGS ----------------------
function logAuditInternal(db: DatabaseSchema, action: string, user: string, details: string) {
  db.auditLogs.unshift({
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    user,
    action,
    details,
  });
  if (db.auditLogs.length > 250) {
    db.auditLogs = db.auditLogs.slice(0, 250);
  }
}

export function getAuditLogs(): AuditLogItem[] {
  return getDatabase().auditLogs;
}

// ---------------------- BACKUP & RESTORE ----------------------
export function createBackup(): { filename: string; path: string; data: DatabaseSchema } {
  ensureDirs();
  const db = getDatabase();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `ms_backup_${timestamp}.json`;
  const backupPath = path.join(BACKUPS_DIR, filename);
  fs.writeFileSync(backupPath, JSON.stringify(db, null, 2), 'utf-8');
  return { filename, path: backupPath, data: db };
}

export function restoreBackup(backupData: DatabaseSchema, username = 'admin'): boolean {
  if (!backupData || !backupData.settings || !backupData.services) {
    throw new Error('Invalid backup data format');
  }
  // Create an automatic safety backup first
  createBackup();
  logAuditInternal(backupData, 'RESTORE_BACKUP', username, 'Database restored from backup file.');
  saveDatabase(backupData);
  return true;
}

export function listBackups(): string[] {
  ensureDirs();
  if (!fs.existsSync(BACKUPS_DIR)) return [];
  return fs.readdirSync(BACKUPS_DIR).filter((f) => f.endsWith('.json')).reverse();
}
