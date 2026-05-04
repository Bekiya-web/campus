// Translation type definitions for EduNexus
// This file contains all the TypeScript interfaces for translations

export type Language = 'en' | 'om' | 'am';

export interface Translations {
  common: CommonTranslations;
  nav: NavTranslations;
  auth: AuthTranslations;
  home: HomeTranslations;
  dashboard: DashboardTranslations;
  materials: MaterialsTranslations;
  upload: UploadTranslations;
  settings: SettingsTranslations;
  profile: ProfileTranslations;
  discussions: DiscussionsTranslations;
  news: NewsTranslations;
  gpa: GPATranslations;
  admin: AdminTranslations;
  footer: FooterTranslations;
  messages: MessagesTranslations;
  buttons: ButtonsTranslations;
  freshman: FreshmanTranslations;
  community: CommunityTranslations;
  placeholders: PlaceholdersTranslations;
  chat: ChatTranslations;
  adminActivity: AdminActivityTranslations;
  materialsManagement: MaterialsManagementTranslations;
  featureRequest: FeatureRequestTranslations;
  aiChat: AIChatTranslations;
  newsPage: NewsPageTranslations;
  newsFilters: NewsFiltersTranslations;
  discussionDetail: DiscussionDetailTranslations;
  postForm: PostFormTranslations;
  adminSetup: AdminSetupTranslations;
}

export interface CommonTranslations {
  appName: string;
  welcome: string;
  loading: string;
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  search: string;
  filter: string;
  back: string;
  next: string;
  submit: string;
  close: string;
  yes: string;
  no: string;
  ok: string;
  error: string;
  success: string;
  viewDetails: string;
  learnMore: string;
  getStarted: string;
  readMore: string;
  seeAll: string;
  noResults: string;
  tryAgain: string;
}

export interface NavTranslations {
  home: string;
  dashboard: string;
  materials: string;
  upload: string;
  discussions: string;
  news: string;
  profile: string;
  settings: string;
  logout: string;
  login: string;
  register: string;
  gpaCalculator: string;
  freshmanHub: string;
  admin: string;
  globalChat: string;
  projects: string;
  features: string;
  logIn: string;
  signOut: string;
  notifications: string;
  noNotifications: string;
  markAsRead: string;
  viewAllNotifications: string;
}

export interface AuthTranslations {
  login: string;
  register: string;
  logout: string;
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  university: string;
  department: string;
  year: string;
  forgotPassword: string;
  rememberMe: string;
  dontHaveAccount: string;
  alreadyHaveAccount: string;
  signInWithGoogle: string;
  loginSuccess: string;
  registerSuccess: string;
  logoutSuccess: string;
  invalidCredentials: string;
  createAccount: string;
  signIn: string;
  selectUniversity: string;
  selectDepartment: string;
  selectYear: string;
}

export interface HomeTranslations {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  joinNow: string;
  exploreFeatures: string;
  featuresTitle: string;
  featuresSubtitle: string;
  feature1Title: string;
  feature1Description: string;
  feature2Title: string;
  feature2Description: string;
  feature3Title: string;
  feature3Description: string;
  feature4Title: string;
  feature4Description: string;
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  step1Title: string;
  step1Description: string;
  step2Title: string;
  step2Description: string;
  step3Title: string;
  step3Description: string;
  testimonialTitle: string;
  testimonialSubtitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  featuredUniversities: string;
  clickUniversity: string;
  swipeExplore: string;
  allUniversities: string;
  projectsCommunity: string;
  modernInitiatives: string;
  studentChat: string;
  studentChatDesc: string;
  openChat: string;
  aiAssistant: string;
  aiAssistantDesc: string;
  aiAssistantNote: string;
  campusProjects: string;
  campusProjectsDesc: string;
  exploreProjects: string;
  nationwide: string;
}

export interface DashboardTranslations {
  title: string;
  welcome: string;
  quickStats: string;
  recentMaterials: string;
  recentDiscussions: string;
  upcomingEvents: string;
  myProgress: string;
  totalPoints: string;
  materialsUploaded: string;
  bookmarked: string;
  discussions: string;
  viewAll: string;
  noMaterials: string;
  noDiscussions: string;
  uploadFirst: string;
  startDiscussion: string;
}

export interface MaterialsTranslations {
  title: string;
  uploadMaterial: string;
  searchMaterials: string;
  filterByDepartment: string;
  filterByYear: string;
  filterByCourse: string;
  noMaterials: string;
  downloadMaterial: string;
  viewDetails: string;
  rating: string;
  downloads: string;
  uploadedBy: string;
  uploadDate: string;
  allDepartments: string;
  allYears: string;
  allCourses: string;
  sortBy: string;
  newest: string;
  oldest: string;
  mostDownloaded: string;
  highestRated: string;
  materialType: string;
  notes: string;
  pastPapers: string;
  assignments: string;
  books: string;
  other: string;
  browseFilter: string;
  filters: string;
  clearFilters: string;
  university: string;
  anyUniversity: string;
  anyDepartment: string;
  anyYear: string;
  results: string;
  result: string;
  noMatch: string;
  loginRequired: string;
  loginRequiredDesc: string;
  logIn: string;
  signUp: string;
}

export interface UploadTranslations {
  title: string;
  uploadMaterial: string;
  materialTitle: string;
  description: string;
  course: string;
  department: string;
  year: string;
  materialType: string;
  selectFile: string;
  uploadButton: string;
  uploading: string;
  uploadSuccess: string;
  uploadError: string;
  dragDrop: string;
  fileSelected: string;
  maxSize: string;
  supportedFormats: string;
  pdfFile: string;
  clickToChoose: string;
  pdfOnly: string;
  quickSummary: string;
  selectUniversity: string;
  selectDepartment: string;
  selectYear: string;
  reviewNote: string;
  freshmanUploadLink: string;
  restrictedMessage: string;
}

export interface SettingsTranslations {
  title: string;
  profile: string;
  notifications: string;
  security: string;
  preferences: string;
  language: string;
  darkMode: string;
  emailNotifications: string;
  pushNotifications: string;
  publicProfile: string;
  showEmail: string;
  changePassword: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  twoFactorAuth: string;
  enable2FA: string;
  disable2FA: string;
  saveChanges: string;
  profileInformation: string;
  updatePersonalInfo: string;
  privacyVisibility: string;
  allowOthersView: string;
  showActivity: string;
  displayActivity: string;
  accountData: string;
  exportData: string;
  downloadCopy: string;
  deleteAccount: string;
  permanentlyDelete: string;
  notificationPreferences: string;
  chooseNotifications: string;
  materialUpdates: string;
  newMaterials: string;
  newMessages: string;
  weeklyDigest: string;
  securitySettings: string;
  managePassword: string;
  addExtraSecurity: string;
  activeSessions: string;
  manageSessions: string;
  currentSession: string;
  appearance: string;
  enableDarkTheme: string;
  languageRegion: string;
  selectLanguage: string;
  displayOptions: string;
  itemsPerPage: string;
  showEmailProfile: string;
}

export interface ProfileTranslations {
  title: string;
  editProfile: string;
  bio: string;
  points: string;
  uploads: string;
  bookmarks: string;
  badges: string;
  activity: string;
  myUploads: string;
  myBookmarks: string;
  recentActivity: string;
  level: string;
  nextLevel: string;
  progressToNext: string;
  morePoints: string;
  achievements: string;
  noUploads: string;
  noBookmarks: string;
  noActivity: string;
  uploadFirst: string;
  bookmarkMaterials: string;
  startActivity: string;
  uploaded: string;
  bookmarked: string;
  changeCover: string;
  joinedDate: string;
}

export interface DiscussionsTranslations {
  title: string;
  createPost: string;
  searchDiscussions: string;
  filterByTopic: string;
  noDiscussions: string;
  startFirst: string;
  postTitle: string;
  postContent: string;
  selectTopic: string;
  publish: string;
  comments: string;
  views: string;
  postedBy: string;
  postedOn: string;
  addComment: string;
  writeComment: string;
  reply: string;
  edit: string;
  delete: string;
  report: string;
  share: string;
  allTopics: string;
  general: string;
  academic: string;
  career: string;
  social: string;
}

export interface NewsTranslations {
  title: string;
  latestNews: string;
  searchNews: string;
  filterByCategory: string;
  noNews: string;
  readMore: string;
  publishedOn: string;
  category: string;
  allCategories: string;
  admission: string;
  scholarship: string;
  event: string;
  deadline: string;
  announcement: string;
  featured: string;
  tags: string;
  relatedNews: string;
  shareNews: string;
  saveNews: string;
  eventDate: string;
  deadlineDate: string;
}

export interface GPATranslations {
  title: string;
  calculator: string;
  addCourse: string;
  courseName: string;
  creditHours: string;
  grade: string;
  remove: string;
  calculate: string;
  yourGPA: string;
  totalCredits: string;
  semesterGPA: string;
  cumulativeGPA: string;
  gradingScale: string;
  performanceGuide: string;
  excellent: string;
  veryGood: string;
  good: string;
  satisfactory: string;
  pass: string;
  fail: string;
  proTips: string;
  tip1: string;
  tip2: string;
  tip3: string;
}

export interface AdminTranslations {
  title: string;
  dashboard: string;
  users: string;
  materials: string;
  discussions: string;
  news: string;
  statistics: string;
  totalUsers: string;
  totalMaterials: string;
  pendingApprovals: string;
  totalDiscussions: string;
  searchUsers: string;
  filterByRole: string;
  allRoles: string;
  students: string;
  admins: string;
  viewDetails: string;
  restrictActions: string;
  changeRole: string;
  deleteUser: string;
  approveMaterial: string;
  rejectMaterial: string;
  deleteMaterial: string;
  hidePost: string;
  unhidePost: string;
  deletePost: string;
  createNews: string;
  editNews: string;
  deleteNews: string;
  activityLog: string;
  recentActivity: string;
  adminMenu: string;
  overview: string;
  pendingReview: string;
  usersManagement: string;
  approvedContent: string;
  featureRequests: string;
  syncData: string;
  systemTools: string;
  uploadFreshmanMaterial: string;
  generalUpload: string;
  queueEmpty: string;
  noMaterialsReview: string;
  systemPulse: string;
  securityHealth: string;
  activeStudents: string;
  totalResources: string;
  queueSize: string;
  uploadedBy: string;
  approve: string;
  reject: string;
  accessDenied: string;
  noPermissionAdmin: string;
  loadingAdmin: string;
}

export interface FooterTranslations {
  product: string;
  account: string;
  features: string;
  aboutUs: string;
  contactUs: string;
  privacyPolicy: string;
  termsOfService: string;
  helpCenter: string;
  builtFor: string;
  allRightsReserved: string;
  professionalPlatform: string;
  modernPlace: string;
  joinNow: string;
  getFullAccess: string;
  createFreeAccount: string;
}

export interface MessagesTranslations {
  profileUpdated: string;
  settingsSaved: string;
  passwordChanged: string;
  materialUploaded: string;
  materialDeleted: string;
  bookmarkAdded: string;
  bookmarkRemoved: string;
  commentAdded: string;
  commentDeleted: string;
  postCreated: string;
  postDeleted: string;
  errorOccurred: string;
  tryAgain: string;
  confirmDelete: string;
  cannotUndo: string;
  areYouSure: string;
  loginRequired: string;
  pleaseLogin: string;
  accessDenied: string;
  noPermission: string;
  networkError: string;
  checkConnection: string;
}

export interface ButtonsTranslations {
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  upload: string;
  download: string;
  share: string;
  bookmark: string;
  unbookmark: string;
  like: string;
  unlike: string;
  comment: string;
  reply: string;
  report: string;
  approve: string;
  reject: string;
  hide: string;
  unhide: string;
  viewMore: string;
  loadMore: string;
  refresh: string;
  filter: string;
  sort: string;
  export: string;
  import: string;
  print: string;
  copy: string;
  paste: string;
  cut: string;
  undo: string;
  redo: string;
}

export interface FreshmanTranslations {
  title: string;
  successHub: string;
  description: string;
  students: string;
  resources: string;
  support: string;
  searchPlaceholder: string;
  viewResources: string;
  hubEmpty: string;
  checkBackSoon: string;
  needSupport: string;
  mentorshipDesc: string;
  joinMentorship: string;
  year1Resources: string;
  organizingResources: string;
  findCourse: string;
  accessResources: string;
  uploadFreshmanMaterial: string;
  year1ResourcesFor: string;
  materialsWillAppear: string;
  pdfFile: string;
  clickToChoose: string;
  pdfOnly: string;
  titleRequired: string;
  exampleTitle: string;
  descriptionLabel: string;
  briefDescription: string;
  universityRequired: string;
  selectUniversity: string;
  courseRequired: string;
  exampleCourse: string;
  freshmanHubUpload: string;
  autoSetYear1: string;
  deptSetGeneral: string;
  willAppearInCourses: string;
  organizedByCourse: string;
  uploading: string;
  uploadGeneralInstead: string;
  uploadToHub: string;
  adminAccessOnly: string;
  onlyAdminsCanUpload: string;
  uploadGeneralMaterial: string;
  goToDashboard: string;
  crushFirstYear: string;
  curatedForFreshmen: string;
}

export interface CommunityTranslations {
  leaderboard: string;
  topContributor: string;
  maintainStreak: string;
  searchMaterialsCourses: string;
}

export interface PlaceholdersTranslations {
  searchUsers: string;
  typeMessage: string;
  searchMaterials: string;
  searchNews: string;
  searchDiscussions: string;
  selectCategory: string;
  selectUniversity: string;
  selectDepartment: string;
  selectYear: string;
  enterTitle: string;
  enterContent: string;
  enterDescription: string;
  enterEmail: string;
  enterPassword: string;
  enterName: string;
  addTags: string;
  searchByAdmin: string;
  filterByAction: string;
  filterByResource: string;
  filterByStatus: string;
  filterByDepartment: string;
  clickToUpload: string;
  pasteImageUrl: string;
  enterExternalLink: string;
  typeTagPressEnter: string;
  shareThoughts: string;
  describeQuestion: string;
  messageAIAssistant: string;
}

export interface ChatTranslations {
  selectUser: string;
  startChatting: string;
  chooseFromList: string;
  noMessagesYet: string;
  startConversation: string;
  chatUsers: string;
  noUsersAvailable: string;
  noUsersMatch: string;
  online: string;
  offline: string;
  send: string;
}

export interface AdminActivityTranslations {
  title: string;
  subtitle: string;
  activities: string;
  searchPlaceholder: string;
  allActions: string;
  create: string;
  update: string;
  delete: string;
  grantPermission: string;
  revokePermission: string;
  allResources: string;
  users: string;
  materials: string;
  messages: string;
  permissions: string;
  noActivitiesFound: string;
  noActivitiesRecorded: string;
  noActivitiesMatch: string;
  resourceId: string;
}

export interface MaterialsManagementTranslations {
  searchPlaceholder: string;
  allStatus: string;
  approved: string;
  pending: string;
  rejected: string;
  flagged: string;
  allDepartments: string;
  noMaterialsFound: string;
  noMaterialsUploaded: string;
  noMaterialsMatch: string;
  topRated: string;
  downloads: string;
  materialDetails: string;
  title: string;
  course: string;
  department: string;
  year: string;
  uploader: string;
  uploadDate: string;
  description: string;
  stats: string;
  rating: string;
  reviews: string;
  fileSize: string;
  fileName: string;
  fileType: string;
  contentModeration: string;
  approve: string;
  flag: string;
  reject: string;
  viewFile: string;
  download: string;
  analytics: string;
  deleteMaterial: string;
  deleteConfirmation: string;
  deleteWarning: string;
  deletePermanently: string;
}

export interface FeatureRequestTranslations {
  title: string;
  featureTitle: string;
  description: string;
  priority: string;
  lowPriority: string;
  mediumPriority: string;
  highPriority: string;
  material: string;
  reviewNote: string;
  submitRequest: string;
  submitting: string;
  titlePlaceholder: string;
  descriptionPlaceholder: string;
}

export interface AIChatTranslations {
  greeting: string;
  online: string;
  clickToExpand: string;
  aiAssistant: string;
  poweredBy: string;
  pressEnter: string;
}

export interface NewsPageTranslations {
  createNews: string;
  editNews: string;
  backToNews: string;
  shareUpdates: string;
  updateInfo: string;
  titleRequired: string;
  summary: string;
  summaryPlaceholder: string;
  summaryHelper: string;
  categoryRequired: string;
  universityRequired: string;
  contentRequired: string;
  fullContent: string;
  contentPlaceholder: string;
  contentHelper: string;
  coverImage: string;
  clickToUploadImage: string;
  imageFormat: string;
  chooseImage: string;
  orPasteUrl: string;
  externalLink: string;
  externalLinkPlaceholder: string;
  externalLinkHelper: string;
  deadline: string;
  deadlineHelper: string;
  eventDate: string;
  eventDateHelper: string;
  tags: string;
  tagsHelper: string;
  add: string;
  featuredNews: string;
  featuredHelper: string;
  publishedNews: string;
  publishedHelper: string;
  cancel: string;
  publishNews: string;
  publishing: string;
  uploadingImage: string;
  saveChanges: string;
  saving: string;
  accessDenied: string;
  onlyAdmins: string;
  loadingNews: string;
  titlePlaceholder: string;
  tagAlreadyAdded: string;
  maxTagsAllowed: string;
  imageRequired: string;
  imageSizeLimit: string;
}

export interface NewsFiltersTranslations {
  searchPlaceholder: string;
  allCategories: string;
  admissions: string;
  scholarships: string;
  events: string;
  deadlines: string;
  announcements: string;
  allUniversities: string;
  clearFilters: string;
}

export interface DiscussionDetailTranslations {
  backToDiscussions: string;
  likes: string;
  like: string;
  comments: string;
  joinConversation: string;
  shareThoughtsPlaceholder: string;
  postComment: string;
  posting: string;
  noCommentsYet: string;
  beFirstToReply: string;
  discussionNotFound: string;
  loadingDiscussion: string;
  hidden: string;
  hiddenUntil: string;
  unhidePost: string;
  hidePost: string;
  deletePost: string;
  deleteConfirmation: string;
  deleteWarning: string;
  hidePostTitle: string;
  hidePostDescription: string;
  hideDuration: string;
  hideDurationPlaceholder: string;
  hideDurationHelper: string;
  hiding: string;
  deleting: string;
}

export interface PostFormTranslations {
  title: string;
  titleHelper: string;
  titlePlaceholder: string;
  content: string;
  contentPlaceholder: string;
  tags: string;
  tagsPlaceholder: string;
  earnPoints: string;
  cancel: string;
  createPost: string;
  posting: string;
}

export interface AdminSetupTranslations {
  adminSetup: string;
  enterAdminKey: string;
  adminKey: string;
  adminKeyPlaceholder: string;
  grantAccess: string;
  grantingAccess: string;
  adminAccessGranted: string;
  youHaveAdmin: string;
  goToAdminDashboard: string;
  forDemo: string;
  adminKeyIs: string;
}
