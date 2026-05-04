// Multi-language translations for EduNexus
// Languages: English (en), Afaan Oromoo (om), Amharic (am)

export type Language = 'en' | 'om' | 'am';

export interface Translations {
  // Common
  common: {
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
  };

  // Navigation
  nav: {
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
  };

  // Auth
  auth: {
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
  };

  // Home Page
  home: {
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
  };

  // Dashboard
  dashboard: {
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
  };

  // Materials
  materials: {
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
  };

  // Upload
  upload: {
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
  };

  // Settings
  settings: {
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
  };

  // Profile
  profile: {
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
  };

  // Discussions
  discussions: {
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
  };

  // News
  news: {
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
  };

  // GPA Calculator
  gpa: {
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
  };

  // Admin
  admin: {
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
    // New admin keys
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
  };

  // Footer
  footer: {
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
  };

  // Messages
  messages: {
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
  };

  // Buttons
  buttons: {
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
  };

  // Freshman Hub
  freshman: {
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
  };

  // Community
  community: {
    leaderboard: string;
    topContributor: string;
    maintainStreak: string;
    searchMaterialsCourses: string;
  };

  // Placeholders
  placeholders: {
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
  };

  // Chat
  chat: {
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
  };

  // Admin Activity Log
  adminActivity: {
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
  };

  // Materials Management
  materialsManagement: {
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
  };

  // Feature Requests
  featureRequest: {
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
  };

  // AI Chat Widget
  aiChat: {
    greeting: string;
    online: string;
    clickToExpand: string;
    aiAssistant: string;
    poweredBy: string;
    pressEnter: string;
  };

  // News
  newsPage: {
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
  };

  // News Filters
  newsFilters: {
    searchPlaceholder: string;
    allCategories: string;
    admissions: string;
    scholarships: string;
    events: string;
    deadlines: string;
    announcements: string;
    allUniversities: string;
    clearFilters: string;
  };

  // Discussion Detail
  discussionDetail: {
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
  };

  // Post Form
  postForm: {
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
  };

  // Admin Setup
  adminSetup: {
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
  };
}

export const translations: Record<Language, Translations> = {
  // English
  en: {
    common: {
      appName: 'EduNexus',
      welcome: 'Welcome',
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      search: 'Search',
      filter: 'Filter',
      back: 'Back',
      next: 'Next',
      submit: 'Submit',
      close: 'Close',
      yes: 'Yes',
      no: 'No',
      ok: 'OK',
      error: 'Error',
      success: 'Success',
      viewDetails: 'View Details',
      learnMore: 'Learn More',
      getStarted: 'Get Started',
      readMore: 'Read More',
      seeAll: 'See All',
      noResults: 'No results found',
      tryAgain: 'Try again',
    },
    nav: {
      home: 'Home',
      dashboard: 'Dashboard',
      materials: 'Materials',
      upload: 'Upload',
      discussions: 'Discussions',
      news: 'News',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
      login: 'Login',
      register: 'Register',
      gpaCalculator: 'GPA Calculator',
      freshmanHub: 'Freshman Hub',
      admin: 'Admin',
      globalChat: 'Global Chat',
      projects: 'Projects',
      features: 'Features',
      logIn: 'Log in',
      signOut: 'Sign Out',
      notifications: 'Notifications',
      noNotifications: 'No notifications',
      markAsRead: 'Mark as read',
      viewAllNotifications: 'View all notifications',
    },
    auth: {
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      fullName: 'Full Name',
      university: 'University',
      department: 'Department',
      year: 'Year',
      forgotPassword: 'Forgot Password?',
      rememberMe: 'Remember Me',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
      signInWithGoogle: 'Sign in with Google',
      loginSuccess: 'Login successful!',
      registerSuccess: 'Registration successful!',
      logoutSuccess: 'Logged out successfully',
      invalidCredentials: 'Invalid email or password',
      createAccount: 'Create Account',
      signIn: 'Sign In',
      selectUniversity: 'Select University',
      selectDepartment: 'Select Department',
      selectYear: 'Select Year',
    },
    dashboard: {
      title: 'Dashboard',
      welcome: 'Welcome back',
      quickStats: 'Quick Stats',
      recentMaterials: 'Recent Materials',
      recentDiscussions: 'Recent Discussions',
      upcomingEvents: 'Upcoming Events',
      myProgress: 'My Progress',
      totalPoints: 'Total Points',
      materialsUploaded: 'Materials Uploaded',
      bookmarked: 'Bookmarked',
      discussions: 'Discussions',
      viewAll: 'View All',
      noMaterials: 'No materials yet',
      noDiscussions: 'No discussions yet',
      uploadFirst: 'Upload your first material',
      startDiscussion: 'Start a discussion',
    },
    materials: {
      title: 'Study Materials',
      uploadMaterial: 'Upload Material',
      searchMaterials: 'Search materials...',
      filterByDepartment: 'Filter by Department',
      filterByYear: 'Filter by Year',
      filterByCourse: 'Filter by Course',
      noMaterials: 'No materials found',
      downloadMaterial: 'Download',
      viewDetails: 'View Details',
      rating: 'Rating',
      downloads: 'Downloads',
      uploadedBy: 'Uploaded by',
      uploadDate: 'Upload Date',
      allDepartments: 'All Departments',
      allYears: 'All Years',
      allCourses: 'All Courses',
      sortBy: 'Sort By',
      newest: 'Newest',
      oldest: 'Oldest',
      mostDownloaded: 'Most Downloaded',
      highestRated: 'Highest Rated',
      materialType: 'Material Type',
      notes: 'Notes',
      pastPapers: 'Past Papers',
      assignments: 'Assignments',
      books: 'Books',
      other: 'Other',
      browseFilter: 'Browse, filter, and search across all uploads',
      filters: 'Filters',
      clearFilters: 'Clear',
      university: 'University',
      anyUniversity: 'Any university',
      anyDepartment: 'Any department',
      anyYear: 'Any year',
      results: 'results',
      result: 'result',
      noMatch: 'No materials match your filters.',
      loginRequired: 'Login Required',
      loginRequiredDesc: 'You need to create an account to access study materials',
      logIn: 'Log In',
      signUp: 'Sign Up',
    },
    settings: {
      title: 'Settings',
      profile: 'Profile',
      notifications: 'Notifications',
      security: 'Security',
      preferences: 'Preferences',
      language: 'Language',
      darkMode: 'Dark Mode',
      emailNotifications: 'Email Notifications',
      pushNotifications: 'Push Notifications',
      publicProfile: 'Public Profile',
      showEmail: 'Show Email Publicly',
      changePassword: 'Change Password',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmNewPassword: 'Confirm New Password',
      twoFactorAuth: 'Two-Factor Authentication',
      enable2FA: 'Enable 2FA',
      disable2FA: 'Disable 2FA',
      saveChanges: 'Save Changes',
      profileInformation: 'Profile Information',
      updatePersonalInfo: 'Update your personal information',
      privacyVisibility: 'Privacy & Visibility',
      allowOthersView: 'Allow others to view your profile',
      showActivity: 'Show Activity',
      displayActivity: 'Display your activity on your profile',
      accountData: 'Account Data',
      exportData: 'Export Data',
      downloadCopy: 'Download a copy of your data',
      deleteAccount: 'Delete Account',
      permanentlyDelete: 'Permanently delete your account',
      notificationPreferences: 'Notification Preferences',
      chooseNotifications: 'Choose which notifications you receive',
      materialUpdates: 'Material Updates',
      newMaterials: 'New materials in your department',
      newMessages: 'New Messages',
      weeklyDigest: 'Weekly Digest',
      securitySettings: 'Security Settings',
      managePassword: 'Manage your password and security',
      addExtraSecurity: 'Add an extra layer of security',
      activeSessions: 'Active Sessions',
      manageSessions: 'Manage your active sessions',
      currentSession: 'Current Session',
      appearance: 'Appearance',
      enableDarkTheme: 'Enable dark theme',
      languageRegion: 'Language & Region',
      selectLanguage: 'Select your preferred language',
      displayOptions: 'Display Options',
      itemsPerPage: 'Items per page',
      showEmailProfile: 'Show email on profile',
    },
    profile: {
      title: 'Profile',
      editProfile: 'Edit Profile',
      bio: 'Bio',
      points: 'Points',
      uploads: 'Uploads',
      bookmarks: 'Bookmarks',
      badges: 'Badges',
      activity: 'Activity',
      myUploads: 'My Uploads',
      myBookmarks: 'My Bookmarks',
      recentActivity: 'Recent Activity',
      level: 'Level',
      nextLevel: 'Next Level',
      progressToNext: 'Progress to Next Level',
      morePoints: 'more points needed',
      achievements: 'Achievements',
      noUploads: 'No uploads yet',
      noBookmarks: 'No bookmarks yet',
      noActivity: 'No activity yet',
      uploadFirst: 'Upload your first material',
      bookmarkMaterials: 'Bookmark some materials',
      startActivity: 'Start your activity',
      uploaded: 'Uploaded',
      bookmarked: 'Bookmarked',
      changeCover: 'Change Cover',
      joinedDate: 'Joined',
    },
    home: {
      heroTitle: 'Welcome to EduNexus',
      heroSubtitle: 'Your Academic Success Platform',
      heroDescription: 'Connect, learn, and grow with Ethiopian students',
      joinNow: 'Join Now',
      exploreFeatures: 'Explore Features',
      featuresTitle: 'Everything You Need',
      featuresSubtitle: 'Powerful features for your academic journey',
      feature1Title: 'Study Materials',
      feature1Description: 'Access and share quality study materials',
      feature2Title: 'Discussions',
      feature2Description: 'Engage in meaningful academic discussions',
      feature3Title: 'GPA Calculator',
      feature3Description: 'Track your academic performance',
      feature4Title: 'AI Assistant',
      feature4Description: 'Get instant help from our AI tutor',
      howItWorksTitle: 'How It Works',
      howItWorksSubtitle: 'Get started in three simple steps',
      step1Title: 'Create Account',
      step1Description: 'Sign up with your university email',
      step2Title: 'Explore Content',
      step2Description: 'Browse materials and join discussions',
      step3Title: 'Contribute & Learn',
      step3Description: 'Share knowledge and earn points',
      testimonialTitle: 'What Students Say',
      testimonialSubtitle: 'Join thousands of satisfied students',
      ctaTitle: 'Ready to Get Started?',
      ctaSubtitle: 'Join EduNexus today and transform your learning',
      ctaButton: 'Create Free Account',
      featuredUniversities: 'Featured universities',
      clickUniversity: 'Click any university to explore their materials',
      swipeExplore: 'Swipe to explore',
      allUniversities: 'All universities',
      projectsCommunity: 'Projects & Community',
      modernInitiatives: 'Modern initiatives connecting students, AI support, and collaborative learning',
      studentChat: 'Student Chat',
      studentChatDesc: 'Connect with classmates, share resources, ask for exam tips, and organize course discussions',
      openChat: 'Open chat experience',
      aiAssistant: 'AI Agent Assistant',
      aiAssistantDesc: 'Ask questions about courses, how to upload materials, and study planning. The AI assistant is available instantly',
      aiAssistantNote: 'Use the floating AI chat button in the bottom right corner',
      campusProjects: 'Campus Projects',
      campusProjectsDesc: 'Explore university-led project showcases, collaborative innovations, and knowledge-sharing programs',
      exploreProjects: 'Explore project resources',
      nationwide: 'NATIONWIDE',
    },
    upload: {
      title: 'Upload Material',
      uploadMaterial: 'Upload New Material',
      materialTitle: 'Material Title',
      description: 'Description',
      course: 'Course',
      department: 'Department',
      year: 'Year',
      materialType: 'Material Type',
      selectFile: 'Select File',
      uploadButton: 'Upload',
      uploading: 'Uploading...',
      uploadSuccess: 'Upload successful!',
      uploadError: 'Upload failed',
      dragDrop: 'Drag and drop files here',
      fileSelected: 'File selected',
      maxSize: 'Max size: 10MB',
      supportedFormats: 'Supported formats: PDF, DOC, DOCX, PPT, PPTX',
      pdfFile: 'PDF file',
      clickToChoose: 'Click to choose a PDF',
      pdfOnly: 'PDFs only · Max 20MB',
      quickSummary: 'Quick summary of what\'s inside...',
      selectUniversity: 'Select',
      selectDepartment: 'Select',
      selectYear: 'Select',
      reviewNote: 'Share a PDF with your fellow students — it will be reviewed by an admin before going public.',
      freshmanUploadLink: 'Want to upload Year 1 materials? Use Freshman Upload →',
      restrictedMessage: 'You have been restricted from uploading materials by an administrator.',
    },
    discussions: {
      title: 'Discussions',
      createPost: 'Create Post',
      searchDiscussions: 'Search discussions...',
      filterByTopic: 'Filter by Topic',
      noDiscussions: 'No discussions found',
      startFirst: 'Start the first discussion',
      postTitle: 'Post Title',
      postContent: 'Post Content',
      selectTopic: 'Select Topic',
      publish: 'Publish',
      comments: 'Comments',
      views: 'Views',
      postedBy: 'Posted by',
      postedOn: 'Posted on',
      addComment: 'Add Comment',
      writeComment: 'Write your comment...',
      reply: 'Reply',
      edit: 'Edit',
      delete: 'Delete',
      report: 'Report',
      share: 'Share',
      allTopics: 'All Topics',
      general: 'General',
      academic: 'Academic',
      career: 'Career',
      social: 'Social',
    },
    news: {
      title: 'News & Updates',
      latestNews: 'Latest News',
      searchNews: 'Search news...',
      filterByCategory: 'Filter by Category',
      noNews: 'No news found',
      readMore: 'Read More',
      publishedOn: 'Published on',
      category: 'Category',
      allCategories: 'All Categories',
      admission: 'Admission',
      scholarship: 'Scholarship',
      event: 'Event',
      deadline: 'Deadline',
      announcement: 'Announcement',
      featured: 'Featured',
      tags: 'Tags',
      relatedNews: 'Related News',
      shareNews: 'Share News',
      saveNews: 'Save News',
      eventDate: 'Event Date',
      deadlineDate: 'Deadline Date',
    },
    gpa: {
      title: 'GPA Calculator',
      calculator: 'Calculate Your GPA',
      addCourse: 'Add Course',
      courseName: 'Course Name',
      creditHours: 'Credit Hours',
      grade: 'Grade',
      remove: 'Remove',
      calculate: 'Calculate',
      yourGPA: 'Your GPA',
      totalCredits: 'Total Credits',
      semesterGPA: 'Semester GPA',
      cumulativeGPA: 'Cumulative GPA',
      gradingScale: 'Grading Scale',
      performanceGuide: 'Performance Guide',
      excellent: 'Excellent',
      veryGood: 'Very Good',
      good: 'Good',
      satisfactory: 'Satisfactory',
      pass: 'Pass',
      fail: 'Fail',
      proTips: 'Pro Tips',
      tip1: 'Focus on high-credit courses',
      tip2: 'Maintain consistent performance',
      tip3: 'Seek help early if struggling',
    },
    admin: {
      title: 'Admin Dashboard',
      dashboard: 'Dashboard',
      users: 'Users',
      materials: 'Materials',
      discussions: 'Discussions',
      news: 'News',
      statistics: 'Statistics',
      totalUsers: 'Total Users',
      totalMaterials: 'Total Materials',
      pendingApprovals: 'Pending Approvals',
      totalDiscussions: 'Total Discussions',
      searchUsers: 'Search users...',
      filterByRole: 'Filter by Role',
      allRoles: 'All Roles',
      students: 'Students',
      admins: 'Admins',
      viewDetails: 'View Details',
      restrictActions: 'Restrict Actions',
      changeRole: 'Change Role',
      deleteUser: 'Delete User',
      approveMaterial: 'Approve Material',
      rejectMaterial: 'Reject Material',
      deleteMaterial: 'Delete Material',
      hidePost: 'Hide Post',
      unhidePost: 'Unhide Post',
      deletePost: 'Delete Post',
      createNews: 'Create News',
      editNews: 'Edit News',
      deleteNews: 'Delete News',
      activityLog: 'Activity Log',
      recentActivity: 'Recent Activity',
      adminMenu: 'Admin Menu',
      overview: 'Overview',
      pendingReview: 'Pending Review',
      usersManagement: 'Users Management',
      approvedContent: 'Approved Content',
      featureRequests: 'Feature Requests',
      syncData: 'Sync Data',
      systemTools: 'System administration and management tools',
      uploadFreshmanMaterial: 'Upload Freshman Material',
      generalUpload: 'General Upload',
      queueEmpty: 'Queue Empty',
      noMaterialsReview: 'No materials awaiting review at this time.',
      systemPulse: 'System Pulse',
      securityHealth: 'Security & Health',
      activeStudents: 'Active Students',
      totalResources: 'Total Resources',
      queueSize: 'Queue Size',
      uploadedBy: 'Uploaded by',
      approve: 'Approve',
      reject: 'Reject',
      accessDenied: 'Access Denied',
      noPermissionAdmin: "You don't have permission to access the admin dashboard.",
      loadingAdmin: 'Loading admin dashboard...',
    },
    buttons: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      upload: 'Upload',
      download: 'Download',
      share: 'Share',
      bookmark: 'Bookmark',
      unbookmark: 'Unbookmark',
      like: 'Like',
      unlike: 'Unlike',
      comment: 'Comment',
      reply: 'Reply',
      report: 'Report',
      approve: 'Approve',
      reject: 'Reject',
      hide: 'Hide',
      unhide: 'Unhide',
      viewMore: 'View More',
      loadMore: 'Load More',
      refresh: 'Refresh',
      filter: 'Filter',
      sort: 'Sort',
      export: 'Export',
      import: 'Import',
      print: 'Print',
      copy: 'Copy',
      paste: 'Paste',
      cut: 'Cut',
      undo: 'Undo',
      redo: 'Redo',
    },
    messages: {
      profileUpdated: 'Profile updated successfully!',
      settingsSaved: 'Settings saved successfully!',
      passwordChanged: 'Password changed successfully!',
      materialUploaded: 'Material uploaded successfully!',
      materialDeleted: 'Material deleted successfully!',
      bookmarkAdded: 'Bookmark added!',
      bookmarkRemoved: 'Bookmark removed!',
      commentAdded: 'Comment added!',
      commentDeleted: 'Comment deleted!',
      postCreated: 'Post created successfully!',
      postDeleted: 'Post deleted successfully!',
      errorOccurred: 'An error occurred',
      tryAgain: 'Please try again',
      confirmDelete: 'Confirm Delete',
      cannotUndo: 'This action cannot be undone',
      areYouSure: 'Are you sure?',
      loginRequired: 'Login Required',
      pleaseLogin: 'Please login to continue',
      accessDenied: 'Access Denied',
      noPermission: 'You do not have permission',
      networkError: 'Network Error',
      checkConnection: 'Please check your connection',
    },
    footer: {
      product: 'Product',
      account: 'Account',
      features: 'Features',
      aboutUs: 'About Us',
      contactUs: 'Contact Us',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      helpCenter: 'Help Center',
      builtFor: 'Built for Ethiopian students',
      allRightsReserved: 'All rights reserved',
      professionalPlatform: 'Professional student collaboration platform',
      modernPlace: 'A modern and professional place for Ethiopian students to learn, share materials, and get help from peers and AI.',
      joinNow: 'Join now',
      getFullAccess: 'Get full access to materials, chat, and AI support.',
      createFreeAccount: 'Create free account',
    },
    freshman: {
      title: 'Freshman Hub',
      successHub: 'Freshman Success Hub',
      description: 'Everything you need to crush your first year',
      students: '1,000+ Students',
      resources: '500+ Resources',
      support: '24/7 Support',
      searchPlaceholder: 'Find your course by name or code...',
      viewResources: 'View Resources',
      hubEmpty: 'Hub Currently Empty',
      checkBackSoon: 'Our administrators are busy curating the best materials for your first year. Check back soon for new resources!',
      needSupport: 'Need Academic Support?',
      mentorshipDesc: 'Our mentorship program connects freshmen with top-performing seniors for 1-on-1 guidance.',
      joinMentorship: 'Join Mentorship',
      year1Resources: 'Year 1 Resources',
      organizingResources: 'Organizing freshman resources...',
      findCourse: 'Search materials, courses…',
      accessResources: 'Access resources and discussions for this first-year course.',
      uploadFreshmanMaterial: 'Upload Freshman Material',
      year1ResourcesFor: 'Year 1 resources for the Freshman Hub',
      materialsWillAppear: 'Materials uploaded here will appear in the Freshman Courses page, organized by course.',
      pdfFile: 'PDF file',
      clickToChoose: 'Click to choose a PDF',
      pdfOnly: 'PDFs only · Max 20MB',
      titleRequired: 'Title *',
      exampleTitle: 'e.g. Introduction to Programming - Lecture Notes',
      descriptionLabel: 'Description',
      briefDescription: 'Brief description of the material content...',
      universityRequired: 'University *',
      selectUniversity: 'Select university',
      courseRequired: 'Course *',
      exampleCourse: 'e.g. Introduction to Programming',
      freshmanHubUpload: 'Freshman Hub Upload',
      autoSetYear1: 'Automatically set to Year 1',
      deptSetGeneral: 'Department set to General',
      willAppearInCourses: 'Will appear in Freshman Courses page',
      organizedByCourse: 'Organized by course code',
      uploading: 'Uploading…',
      uploadGeneralInstead: 'Upload General Material Instead',
      uploadToHub: 'Upload to Freshman Hub',
      adminAccessOnly: 'Admin Access Only',
      onlyAdminsCanUpload: 'Only administrators can upload materials to the Freshman Hub.',
      uploadGeneralMaterial: 'Upload General Material',
      goToDashboard: 'Go to Dashboard',
      crushFirstYear: 'Everything you need to crush your first year. Get organized access to notes, past exams, and study materials curated for freshmen.',
      curatedForFreshmen: 'curated for freshmen',
    },
    community: {
      leaderboard: 'Community Leaderboard',
      topContributor: 'Top Contributor',
      maintainStreak: 'Maintain your streak to climb higher!',
      searchMaterialsCourses: 'Search materials, courses…',
    },

    placeholders: {
      searchUsers: 'Search users...',
      typeMessage: 'Type your message...',
      searchMaterials: 'Search materials by title, course, or uploader...',
      searchNews: 'Search news, scholarships, events...',
      searchDiscussions: 'Search discussions...',
      selectCategory: 'Select category',
      selectUniversity: 'Select university',
      selectDepartment: 'Select department',
      selectYear: 'Select year',
      enterTitle: 'Enter title',
      enterContent: 'Enter content',
      enterDescription: 'Enter description',
      enterEmail: 'Enter email',
      enterPassword: 'Enter password',
      enterName: 'Enter name',
      addTags: 'Add tags (press Enter)...',
      searchByAdmin: 'Search by admin name, action details, or resource ID...',
      filterByAction: 'Filter by action',
      filterByResource: 'Filter by resource',
      filterByStatus: 'Filter by status',
      filterByDepartment: 'Filter by department',
      clickToUpload: 'Click to upload image',
      pasteImageUrl: 'Or paste image URL',
      enterExternalLink: 'https://university.edu.et/announcement',
      typeTagPressEnter: 'Type a tag and press Enter',
      shareThoughts: 'Share your thoughts or provide a solution...',
      describeQuestion: 'Describe your question or idea in detail...',
      messageAIAssistant: 'Message AI Assistant...',
    },

    chat: {
      selectUser: 'Select a user to start chatting',
      startChatting: 'Choose someone from the user list to begin a conversation',
      chooseFromList: 'Choose someone from the user list to begin a conversation',
      noMessagesYet: 'No messages yet. Start the conversation!',
      startConversation: 'No messages yet',
      chatUsers: 'Chat Users',
      noUsersAvailable: 'No users available for chat',
      noUsersMatch: 'No users match your search',
      online: 'Online',
      offline: 'Offline',
      send: 'Send',
    },

    adminActivity: {
      title: 'Admin Activity Log',
      subtitle: 'Track all administrative actions and changes',
      activities: 'activities',
      searchPlaceholder: 'Search by admin name, action details, or resource ID...',
      allActions: 'All Actions',
      create: 'Create',
      update: 'Update',
      delete: 'Delete',
      grantPermission: 'Grant Permission',
      revokePermission: 'Revoke Permission',
      allResources: 'All Resources',
      users: 'Users',
      materials: 'Materials',
      messages: 'Messages',
      permissions: 'Permissions',
      noActivitiesFound: 'No Activities Found',
      noActivitiesRecorded: 'No admin activities recorded yet.',
      noActivitiesMatch: 'No activities match your current search criteria.',
      resourceId: 'Resource ID',
    },

    materialsManagement: {
      searchPlaceholder: 'Search materials by title, course, or uploader...',
      allStatus: 'All Status',
      approved: 'Approved',
      pending: 'Pending',
      rejected: 'Rejected',
      flagged: 'Flagged',
      allDepartments: 'All Departments',
      noMaterialsFound: 'No Materials Found',
      noMaterialsUploaded: 'No materials have been uploaded to the system yet.',
      noMaterialsMatch: 'No materials match your current search criteria.',
      topRated: 'Top Rated',
      downloads: 'downloads',
      materialDetails: 'Material Details',
      title: 'Title',
      course: 'Course',
      department: 'Department',
      year: 'Year',
      uploader: 'Uploader',
      uploadDate: 'Upload Date',
      description: 'Description',
      stats: 'Stats',
      rating: 'Rating',
      reviews: 'Reviews',
      fileSize: 'File Size',
      fileName: 'File Name',
      fileType: 'File Type',
      contentModeration: 'Content Moderation',
      approve: 'Approve',
      flag: 'Flag',
      reject: 'Reject',
      viewFile: 'View File',
      download: 'Download',
      analytics: 'Analytics',
      deleteMaterial: 'Delete Material',
      deleteConfirmation: 'Delete Material',
      deleteWarning: 'Are you sure you want to permanently delete this material? This action cannot be undone and will remove all ratings, reviews, download statistics, and associated bookmarks.',
      deletePermanently: 'Delete Permanently',
    },

    featureRequest: {
      title: 'Request Feature Enhancement',
      featureTitle: 'Feature Title',
      description: 'Description',
      priority: 'Priority',
      lowPriority: 'Low Priority',
      mediumPriority: 'Medium Priority',
      highPriority: 'High Priority',
      material: 'Material',
      reviewNote: 'Your request will be reviewed by administrators and may be implemented in future updates.',
      submitRequest: 'Submit Request',
      submitting: 'Submitting...',
      titlePlaceholder: 'e.g., Add search functionality',
      descriptionPlaceholder: 'Describe the feature you\'d like to see added to this material or the platform...',
    },

    aiChat: {
      greeting: 'Hello! I\'m your EduNexus AI assistant. I\'m here to help you navigate the platform, find study materials, calculate your GPA, and understand our rewards system. How can I help you today?',
      online: 'Online',
      clickToExpand: 'Click to expand',
      aiAssistant: 'AI Assistant',
      poweredBy: 'Powered by EduNexus AI',
      pressEnter: 'Press Enter to send',
    },

    newsPage: {
      createNews: 'Create News Post',
      editNews: 'Edit News Post',
      backToNews: 'Back to News',
      shareUpdates: 'Share important updates with students',
      updateInfo: 'Update news information',
      titleRequired: 'Title is required',
      summary: 'Summary',
      summaryPlaceholder: 'Short description (shown on news cards)',
      summaryHelper: 'Optional: Brief summary for preview cards',
      categoryRequired: 'Category is required',
      universityRequired: 'University is required',
      contentRequired: 'Content is required',
      fullContent: 'Content',
      contentPlaceholder: 'Full news content...',
      contentHelper: 'Full details of the news announcement',
      coverImage: 'Cover Image',
      clickToUploadImage: 'Click to upload image',
      imageFormat: 'PNG, JPG, GIF up to 5MB',
      chooseImage: 'Choose Image',
      orPasteUrl: 'Or paste image URL',
      externalLink: 'External Link',
      externalLinkPlaceholder: 'https://university.edu.et/announcement',
      externalLinkHelper: 'Optional: Link to official page',
      deadline: 'Deadline',
      deadlineHelper: 'For applications/registrations',
      eventDate: 'Event Date',
      eventDateHelper: 'When the event takes place',
      tags: 'Tags',
      tagsHelper: 'Add tags to categorize your news (e.g., scholarship, graduate, engineering)',
      add: 'Add',
      featuredNews: 'Featured News',
      featuredHelper: 'Show this news in the featured carousel',
      publishedNews: 'Published',
      publishedHelper: 'Make this news visible to all users',
      cancel: 'Cancel',
      publishNews: 'Publish News',
      publishing: 'Publishing...',
      uploadingImage: 'Uploading Image...',
      saveChanges: 'Save Changes',
      saving: 'Saving...',
      accessDenied: 'Access Denied',
      onlyAdmins: 'Only admins can create news posts.',
      loadingNews: 'Loading news...',
      titlePlaceholder: 'e.g., New Scholarship Opportunity for Graduate Students',
      tagAlreadyAdded: 'Tag already added',
      maxTagsAllowed: 'Maximum 10 tags allowed',
      imageRequired: 'Please select an image file',
      imageSizeLimit: 'Image must be under 5MB',
    },

    newsFilters: {
      searchPlaceholder: 'Search news, scholarships, events...',
      allCategories: 'All Categories',
      admissions: '🎓 Admissions',
      scholarships: '💰 Scholarships',
      events: '📅 Events',
      deadlines: '⏰ Deadlines',
      announcements: '📢 Announcements',
      allUniversities: 'All Universities',
      clearFilters: 'Clear Filters',
    },

    discussionDetail: {
      backToDiscussions: 'Back to Discussions',
      likes: 'Likes',
      like: 'Like',
      comments: 'Comments',
      joinConversation: 'Join the Conversation',
      shareThoughtsPlaceholder: 'Share your thoughts or provide a solution...',
      postComment: 'Post Comment',
      posting: 'Posting...',
      noCommentsYet: 'No comments yet. Be the first to reply!',
      beFirstToReply: 'Be the first to reply!',
      discussionNotFound: 'Discussion not found',
      loadingDiscussion: 'Loading discussion...',
      hidden: 'Hidden',
      hiddenUntil: 'until',
      unhidePost: 'Unhide Post',
      hidePost: 'Hide Post',
      deletePost: 'Delete Post',
      deleteConfirmation: 'Delete Discussion Post',
      deleteWarning: 'Are you sure you want to delete this post? This action cannot be undone. All comments and likes will also be permanently deleted.',
      hidePostTitle: 'Hide Discussion Post',
      hidePostDescription: 'Hide this post from regular users. You can set a duration or hide it indefinitely.',
      hideDuration: 'Hide Duration (hours)',
      hideDurationPlaceholder: 'Leave empty for indefinite',
      hideDurationHelper: 'Leave empty to hide indefinitely. Enter hours (e.g., 24 for 1 day, 168 for 1 week)',
      hiding: 'Hiding...',
      deleting: 'Deleting...',
    },

    postForm: {
      title: 'Title',
      titleHelper: 'Be specific and clear',
      titlePlaceholder: 'e.g., How to handle complex state in React?',
      content: 'Content',
      contentPlaceholder: 'Describe your question or idea in detail...',
      tags: 'Tags',
      tagsPlaceholder: 'Add tags (press Enter)...',
      earnPoints: 'Earn 5 points for every new discussion post!',
      cancel: 'Cancel',
      createPost: 'Create Post',
      posting: 'Posting...',
    },

    adminSetup: {
      adminSetup: 'Admin Setup',
      enterAdminKey: 'Enter the admin key to gain administrative privileges',
      adminKey: 'Admin Key',
      adminKeyPlaceholder: 'Enter admin key...',
      grantAccess: 'Grant Admin Access',
      grantingAccess: 'Granting Access...',
      adminAccessGranted: 'Admin Access Granted',
      youHaveAdmin: 'You have admin privileges. Access the admin dashboard from the navigation menu.',
      goToAdminDashboard: 'Go to Admin Dashboard',
      forDemo: 'For Demo:',
      adminKeyIs: 'Admin key is',
    },
  },

  // Afaan Oromoo
  om: {
    common: {
      appName: 'EduNexus',
      welcome: 'Baga Nagaan Dhuftan',
      loading: 'Fe\'aa jira...',
      save: 'Olkaa\'i',
      cancel: 'Dhiisi',
      delete: 'Haqi',
      edit: 'Gulaali',
      search: 'Barbaadi',
      filter: 'Calaqqisiisi',
      back: 'Duubatti Deebi\'i',
      next: 'Itti Aanuu',
      submit: 'Ergi',
      close: 'Cufi',
      yes: 'Eeyyee',
      no: 'Lakki',
      ok: 'Tole',
      error: 'Dogongora',
      success: 'Milkaa\'ina',
      viewDetails: 'Bal\'inaan Ilaali',
      learnMore: 'Dabalata Barbaadi',
      getStarted: 'Jalqabi',
      readMore: 'Dabalata Dubbisi',
      seeAll: 'Hunda Ilaali',
      noResults: 'Bu\'aan hin argamne',
      tryAgain: 'Irra deebi\'ii yaali',
    },
    nav: {
      home: 'Mana',
      dashboard: 'Gabatee',
      materials: 'Meeshaalee Barnoota',
      upload: 'Fe\'i',
      discussions: 'Marii',
      news: 'Oduu',
      profile: 'Piroofaayilii',
      settings: 'Qindaa\'ina',
      logout: 'Ba\'i',
      login: 'Seeni',
      register: 'Galmaa\'i',
      gpaCalculator: 'Shallaggii GPA',
      freshmanHub: 'Bakka Barattootaa Haaraa',
      admin: 'Bulchaa',
      globalChat: 'Haasawa Waliigalaa',
      projects: 'Pirojektii',
      features: 'Amaloota',
      logIn: 'Seeni',
      signOut: 'Ba\'i',
      notifications: 'Beeksisa',
      noNotifications: 'Beeksisni hin jiru',
      markAsRead: 'Akka dubbifametti mallattoo godhi',
      viewAllNotifications: 'Beeksisa hunda ilaali',
    },
    auth: {
      login: 'Seeni',
      register: 'Galmaa\'i',
      logout: 'Ba\'i',
      email: 'Imeelii',
      password: 'Jecha Icciitii',
      confirmPassword: 'Jecha Icciitii Mirkaneessi',
      fullName: 'Maqaa Guutuu',
      university: 'Yunivarsiitii',
      department: 'Damee',
      year: 'Bara',
      forgotPassword: 'Jecha Icciitii Irraanfatte?',
      rememberMe: 'Na Yaadadhu',
      dontHaveAccount: 'Herrega hin qabdu?',
      alreadyHaveAccount: 'Duraan herrega qabduu?',
      signInWithGoogle: 'Google\'n Seeni',
      loginSuccess: 'Seenuun milkaa\'eera!',
      registerSuccess: 'Galmaa\'uun milkaa\'eera!',
      logoutSuccess: 'Ba\'uun milkaa\'eera',
      invalidCredentials: 'Imeelii ykn jecha icciitii sirrii miti',
      createAccount: 'Herrega Uumuu',
      signIn: 'Seeni',
      selectUniversity: 'Yunivarsiitii Filadhu',
      selectDepartment: 'Damee Filadhu',
      selectYear: 'Bara Filadhu',
    },
    dashboard: {
      title: 'Gabatee',
      welcome: 'Baga Nagaan Deebitan',
      quickStats: 'Daataa Saffisaa',
      recentMaterials: 'Meeshaalee Barnoota Haaraa',
      recentDiscussions: 'Mariiwwan Haaraa',
      upcomingEvents: 'Taateewwan Dhufan',
      myProgress: 'Guddina Koo',
      totalPoints: 'Qabxii Waliigalaa',
      materialsUploaded: 'Meeshaalee Fe\'aman',
      bookmarked: 'Mallattoowwan',
      discussions: 'Mariiwwan',
      viewAll: 'Hunda Ilaali',
      noMaterials: 'Meeshaan hin jiru',
      noDiscussions: 'Mariiwwan hin jiru',
      uploadFirst: 'Meeshaa jalqabaa fe\'i',
      startDiscussion: 'Marii jalqabi',
    },
    materials: {
      title: 'Meeshaalee Barnoota',
      uploadMaterial: 'Meeshaa Fe\'i',
      searchMaterials: 'Meeshaalee barbaadi...',
      filterByDepartment: 'Dameen Calaqqisiisi',
      filterByYear: 'Baraan Calaqqisiisi',
      filterByCourse: 'Koorsiin Calaqqisiisi',
      noMaterials: 'Meeshaan hin argamne',
      downloadMaterial: 'Buufadhu',
      viewDetails: 'Bal\'inaan Ilaali',
      rating: 'Madaallii',
      downloads: 'Buufachiisa',
      uploadedBy: 'Kan Fe\'e',
      uploadDate: 'Guyyaa Fe\'ame',
      allDepartments: 'Damee Hunda',
      allYears: 'Bara Hunda',
      allCourses: 'Koorsii Hunda',
      sortBy: 'Tartiibaan',
      newest: 'Haaraa',
      oldest: 'Moofaa',
      mostDownloaded: 'Baay\'ee Buufame',
      highestRated: 'Madaallii Olaanaa',
      materialType: 'Gosa Meeshaa',
      notes: 'Yaadannoo',
      pastPapers: 'Qormaata Darbe',
      assignments: 'Ramaddii',
      books: 'Kitaabota',
      other: 'Kan Biraa',
      browseFilter: 'Sakatta\'i, calaqqisiisi, fi meeshaalee hunda keessaa barbaadi',
      filters: 'Calaqqisiisota',
      clearFilters: 'Haqi',
      university: 'Yunivarsiitii',
      anyUniversity: 'Yunivarsiitii kamiyyuu',
      anyDepartment: 'Damee kamiyyuu',
      anyYear: 'Bara kamiyyuu',
      results: 'bu\'aa',
      result: 'bu\'aa',
      noMatch: 'Meeshaan calaqqisiisota kee waliin wal hin simne.',
      loginRequired: 'Seenuun Barbaachisaa',
      loginRequiredDesc: 'Meeshaalee barnoota argachuuf herrega uumuu qabda',
      logIn: 'Seeni',
      signUp: 'Galmaa\'i',
    },
    settings: {
      title: 'Qindaa\'ina',
      profile: 'Piroofaayilii',
      notifications: 'Beeksisa',
      security: 'Nageenyaa',
      preferences: 'Filannoo',
      language: 'Afaan',
      darkMode: 'Haalata Dukkanaa\'aa',
      emailNotifications: 'Beeksisa Imeelii',
      pushNotifications: 'Beeksisa Dhiibaa',
      publicProfile: 'Piroofaayilii Uummataa',
      showEmail: 'Imeelii Uummatatti Mul\'isi',
      changePassword: 'Jecha Icciitii Jijjiiri',
      currentPassword: 'Jecha Icciitii Ammaa',
      newPassword: 'Jecha Icciitii Haaraa',
      confirmNewPassword: 'Jecha Icciitii Haaraa Mirkaneessi',
      twoFactorAuth: 'Mirkaneessaa Wanta Lamaa',
      enable2FA: 'Mirkaneessaa Wanta Lamaa Dandeessisi',
      disable2FA: 'Mirkaneessaa Wanta Lamaa Dhaamsi',
      saveChanges: 'Jijjiirama Olkaa\'i',
      profileInformation: 'Odeeffannoo Piroofaayilii',
      updatePersonalInfo: 'Odeeffannoo dhuunfaa kee haaroomsi',
      privacyVisibility: 'Dhuunfachisummaa fi Mul\'achuu',
      allowOthersView: 'Namoota biroo piroofaayilii kee akka ilaalan hayyami',
      showActivity: 'Sochii Mul\'isi',
      displayActivity: 'Sochii kee piroofaayilii kee irratti mul\'isi',
      accountData: 'Daataa Herregaa',
      exportData: 'Daataa Ergadhu',
      downloadCopy: 'Koppii daataa keetii buufadhu',
      deleteAccount: 'Herrega Haqi',
      permanentlyDelete: 'Herrega kee yeroo hundaaf haqi',
      notificationPreferences: 'Filannoo Beeksisa',
      chooseNotifications: 'Beeksisa argachuu barbaaddu filadhu',
      materialUpdates: 'Fooyya\'iinsa Meeshaa',
      newMaterials: 'Meeshaalee haaraa damee kee keessatti',
      newMessages: 'Ergaa Haaraa',
      weeklyDigest: 'Cuunfaa Torbanaa',
      securitySettings: 'Qindaa\'ina Nageenyaa',
      managePassword: 'Jecha icciitii fi nageenyaa kee bulchi',
      addExtraSecurity: 'Nageenyaa dabalataa ida\'i',
      activeSessions: 'Seeshiniiwwan Hojii Irra Jiran',
      manageSessions: 'Seeshiniiwwan hojii irra jiran bulchi',
      currentSession: 'Seeshinii Ammaa',
      appearance: 'Bifaa',
      enableDarkTheme: 'Mata-duree dukkanaa\'aa dandeessisi',
      languageRegion: 'Afaan fi Naannoo',
      selectLanguage: 'Afaan filatte filadhu',
      displayOptions: 'Filannoo Agarsiisaa',
      itemsPerPage: 'Wantoota fuula tokkotti',
      showEmailProfile: 'Imeelii piroofaayilii irratti mul\'isi',
    },
    profile: {
      title: 'Piroofaayilii',
      editProfile: 'Piroofaayilii Gulaali',
      bio: 'Waa\'ee Koo',
      points: 'Qabxii',
      uploads: 'Kan Fe\'e',
      bookmarks: 'Mallattoowwan',
      badges: 'Baajii',
      activity: 'Sochii',
      myUploads: 'Kan Ani Fe\'e',
      myBookmarks: 'Mallattoowwan Koo',
      recentActivity: 'Sochii Dhiyoo',
      level: 'Sadarkaa',
      nextLevel: 'Sadarkaa Itti Aanu',
      progressToNext: 'Guddina Gara Sadarkaa Itti Aanuutti',
      morePoints: 'qabxii dabalataa barbaachisa',
      achievements: 'Milkaa\'inoota',
      noUploads: 'Meeshaan hin fe\'amne',
      noBookmarks: 'Mallattoon hin jiru',
      noActivity: 'Sochiin hin jiru',
      uploadFirst: 'Meeshaa jalqabaa fe\'i',
      bookmarkMaterials: 'Meeshaalee tokko tokko mallattoo godhi',
      startActivity: 'Sochii kee jalqabi',
      uploaded: 'Fe\'ame',
      bookmarked: 'Mallattoo Godhamee',
      changeCover: 'Uwwisa Jijjiiri',
      joinedDate: 'Guyyaa Makame',
    },
    home: {
      heroTitle: 'Gara EduNexus Baga Nagaan Dhuftan',
      heroSubtitle: 'Waltajjii Milkaa\'ina Barnootaa Keessanii',
      heroDescription: 'Barattootaa Itoophiyaa waliin wal qunnami, barnoota, fi guddadhu',
      joinNow: 'Amma Makamaa',
      exploreFeatures: 'Amaloota Qoradhu',
      featuresTitle: 'Waan Barbaachisu Hunda',
      featuresSubtitle: 'Amaloota humna qabeessa imala barnootaa keessaniif',
      feature1Title: 'Meeshaalee Barnoota',
      feature1Description: 'Meeshaalee barnoota qulqullina qabu argadhu fi qooddadhu',
      feature2Title: 'Mariiwwan',
      feature2Description: 'Mariiwwan barnoota hiika qabanitti hirmaadhu',
      feature3Title: 'Shallaggii GPA',
      feature3Description: 'Raawwii barnoota keessan hordofaa',
      feature4Title: 'Gargaaraa AI',
      feature4Description: 'Barsiisaa AI keenya irraa gargaarsa battalumatti argadhu',
      howItWorksTitle: 'Akkamitti Hojjeta',
      howItWorksSubtitle: 'Tarkaanfii sadi salphaa keessatti jalqabaa',
      step1Title: 'Herrega Uumaa',
      step1Description: 'Imeelii yunivarsiitii keessaniin galmaa\'aa',
      step2Title: 'Qabiyyee Qoradhu',
      step2Description: 'Meeshaalee sakatta\'aa fi mariiwwanitti makamaa',
      step3Title: 'Hirmaadhu fi Barnoota',
      step3Description: 'Beekumsa qooddadhu fi qabxii argadhu',
      testimonialTitle: 'Barattoonni Maal Jedhu',
      testimonialSubtitle: 'Barattootaa kumaatama gammadan waliin makamaa',
      ctaTitle: 'Jalqabuuf Qophii Dha?',
      ctaSubtitle: 'Har\'a EduNexus makamaa fi barnoota keessan jijjiiraa',
      ctaButton: 'Herrega Bilisaa Uumaa',
      featuredUniversities: 'Yunivarsiitii Mul\'ataa',
      clickUniversity: 'Meeshaalee isaanii qorachuuf yunivarsiitii kamiyyuu cuqaasaa',
      swipeExplore: 'Qorachuuf harkisaa',
      allUniversities: 'Yunivarsiitii Hunda',
      projectsCommunity: 'Pirojektii fi Hawaasa',
      modernInitiatives: 'Jalqabbiiwwan ammayyaa barattootaa, deeggarsa AI, fi barnoota walta\'insaa walitti fidan',
      studentChat: 'Haasawa Barattootaa',
      studentChatDesc: 'Hiriyyoota daree waliin wal qunnami, qabeenya qooddadhu, gorsa qormaataa gaafadhu, fi mariiwwan koorsii qindeessi',
      openChat: 'Muuxannoo haasawaa bani',
      aiAssistant: 'Gargaaraa Eejentii AI',
      aiAssistantDesc: 'Waa\'ee koorsiiwwanii, akkamitti meeshaalee fe\'uu, fi karoora barnoota gaafadhu. Gargaaraan AI battalumatti ni argama',
      aiAssistantNote: 'Qabduu haasawa AI kan golee mirgaa gadii keessatti asphaltuu fayyadami',
      campusProjects: 'Pirojektoota Kaampasii',
      campusProjectsDesc: 'Agarsiisa pirojektii yunivarsiitiin geggeeffamu, kalaqaa walta\'insaa, fi sagantaalee qooddannoo beekumsaa qoradhu',
      exploreProjects: 'Qabeenya pirojektii qoradhu',
      nationwide: 'BIYYA GUUTUU',
    },
    upload: {
      title: 'Meeshaa Fe\'i',
      uploadMaterial: 'Meeshaa Haaraa Fe\'i',
      materialTitle: 'Mataduree Meeshaa',
      description: 'Ibsa',
      course: 'Koorsii',
      department: 'Damee',
      year: 'Bara',
      materialType: 'Gosa Meeshaa',
      selectFile: 'Faayilii Filadhu',
      uploadButton: 'Fe\'i',
      uploading: 'Fe\'aa jira...',
      uploadSuccess: 'Fe\'uun milkaa\'eera!',
      uploadError: 'Fe\'uun dhabame',
      dragDrop: 'Faayiloota as harkisaa fi kaa\'aa',
      fileSelected: 'Faayiliin filatame',
      maxSize: 'Guddina guddaa: 10MB',
      supportedFormats: 'Bifa deeggaraman: PDF, DOC, DOCX, PPT, PPTX',
      pdfFile: 'Faayilii PDF',
      clickToChoose: 'PDF filachuuf cuqaasaa',
      pdfOnly: 'PDF qofa · Hanga 20MB',
      quickSummary: 'Cuunfaa saffisaa waan keessa jiru...',
      selectUniversity: 'Filadhu',
      selectDepartment: 'Filadhu',
      selectYear: 'Filadhu',
      reviewNote: 'PDF hiriyyoota kee barattootaa waliin qooddadhu — bulchaan dursa gamaaggama godha.',
      freshmanUploadLink: 'Meeshaalee Bara 1 fe\'uu barbaaddaa? Fe\'iinsa Barattootaa Haaraa fayyadami →',
      restrictedMessage: 'Bulchaan meeshaalee fe\'uu irraa dhaamfamtaniirtu.',
    },
    discussions: {
      title: 'Mariiwwan',
      createPost: 'Barreeffama Uumaa',
      searchDiscussions: 'Mariiwwan barbaadi...',
      filterByTopic: 'Mata-dureeen Calaqqisiisi',
      noDiscussions: 'Mariiwwan hin argamne',
      startFirst: 'Marii jalqabaa jalqabi',
      postTitle: 'Mataduree Barreeffamaa',
      postContent: 'Qabiyyee Barreeffamaa',
      selectTopic: 'Mata-duree Filadhu',
      publish: 'Maxxansi',
      comments: 'Yaadota',
      views: 'Ilaaltoota',
      postedBy: 'Kan Maxxanse',
      postedOn: 'Guyyaa Maxxanfame',
      addComment: 'Yaada Ida\'i',
      writeComment: 'Yaada kee barreessi...',
      reply: 'Deebii Kenni',
      edit: 'Gulaali',
      delete: 'Haqi',
      report: 'Gabaasi',
      share: 'Qooddadhu',
      allTopics: 'Mata-duree Hunda',
      general: 'Waliigalaa',
      academic: 'Barnoota',
      career: 'Hojii',
      social: 'Hawaasummaa',
    },
    news: {
      title: 'Oduu fi Fooyya\'iinsa',
      latestNews: 'Oduu Haaraa',
      searchNews: 'Oduu barbaadi...',
      filterByCategory: 'Ramaddiin Calaqqisiisi',
      noNews: 'Oduun hin argamne',
      readMore: 'Dabalata Dubbisi',
      publishedOn: 'Guyyaa Maxxanfame',
      category: 'Ramaddii',
      allCategories: 'Ramaddii Hunda',
      admission: 'Seensa',
      scholarship: 'Skoolarshipii',
      event: 'Taatee',
      deadline: 'Yeroo Xumuraa',
      announcement: 'Beeksisa',
      featured: 'Mul\'ataa',
      tags: 'Mallattoowwan',
      relatedNews: 'Oduu Walqabataa',
      shareNews: 'Oduu Qooddadhu',
      saveNews: 'Oduu Olkaa\'i',
      eventDate: 'Guyyaa Taatee',
      deadlineDate: 'Guyyaa Yeroo Xumuraa',
    },
    gpa: {
      title: 'Shallaggii GPA',
      calculator: 'GPA Keessan Shallagaa',
      addCourse: 'Koorsii Ida\'i',
      courseName: 'Maqaa Koorsii',
      creditHours: 'Sa\'aatii Kireedii',
      grade: 'Qabxii',
      remove: 'Haqi',
      calculate: 'Shallagaa',
      yourGPA: 'GPA Keessan',
      totalCredits: 'Kireedii Waliigalaa',
      semesterGPA: 'GPA Semesteraa',
      cumulativeGPA: 'GPA Walitti Qabamaa',
      gradingScale: 'Madaallii Qabxii',
      performanceGuide: 'Qajeelfama Raawwii',
      excellent: 'Olaanaa',
      veryGood: 'Baay\'ee Gaarii',
      good: 'Gaarii',
      satisfactory: 'Quubsaa',
      pass: 'Darbe',
      fail: 'Kufee',
      proTips: 'Gorsa Ogeessaa',
      tip1: 'Koorsiiwwan kireedii guddaa qaban irratti xiyyeeffadhu',
      tip2: 'Raawwii wal-siman eegaa',
      tip3: 'Yoo rakkattan dafanii gargaarsa barbaadaa',
    },
    admin: {
      title: 'Gabatee Bulchaa',
      dashboard: 'Gabatee',
      users: 'Fayyadamtoota',
      materials: 'Meeshaalee',
      discussions: 'Mariiwwan',
      news: 'Oduu',
      statistics: 'Daataa Istaatistiksii',
      totalUsers: 'Fayyadamtoota Waliigalaa',
      totalMaterials: 'Meeshaalee Waliigalaa',
      pendingApprovals: 'Ragga\'iinsa Eegaa Jiran',
      totalDiscussions: 'Mariiwwan Waliigalaa',
      searchUsers: 'Fayyadamtoota barbaadi...',
      filterByRole: 'Gaheen Calaqqisiisi',
      allRoles: 'Gahee Hunda',
      students: 'Barattootaa',
      admins: 'Bulchitootaa',
      viewDetails: 'Bal\'inaan Ilaali',
      restrictActions: 'Gocha Dhaamsi',
      changeRole: 'Gahee Jijjiiri',
      deleteUser: 'Fayyadamaa Haqi',
      approveMaterial: 'Meeshaa Raggeessi',
      rejectMaterial: 'Meeshaa Didi',
      deleteMaterial: 'Meeshaa Haqi',
      hidePost: 'Barreeffama Dhoksi',
      unhidePost: 'Barreeffama Mul\'isi',
      deletePost: 'Barreeffama Haqi',
      createNews: 'Oduu Uumaa',
      editNews: 'Oduu Gulaali',
      deleteNews: 'Oduu Haqi',
      activityLog: 'Galmee Sochii',
      recentActivity: 'Sochii Dhiyoo',
      adminMenu: 'Baafata Bulchaa',
      overview: 'Ilaalcha Waliigalaa',
      pendingReview: 'Gamaaggama Eegaa Jiru',
      usersManagement: 'Bulchiinsa Fayyadamtootaa',
      approvedContent: 'Qabiyyee Raggaa\'e',
      featureRequests: 'Gaaffii Amaloota',
      syncData: 'Daataa Walsimsiisuuf',
      systemTools: 'Meeshaalee bulchiinsaa fi to\'annoo sirna',
      uploadFreshmanMaterial: 'Meeshaa Barattootaa Haaraa Fe\'i',
      generalUpload: 'Fe\'iinsa Waliigalaa',
      queueEmpty: 'Tarreen Duwwaa',
      noMaterialsReview: 'Yeroo ammaa meeshaan gamaaggama eegaa jiru hin jiru.',
      systemPulse: 'Dha\'annaa Sirna',
      securityHealth: 'Nageenyaa fi Fayyaa',
      activeStudents: 'Barattootaa Hojii Irra Jiran',
      totalResources: 'Qabeenya Waliigalaa',
      queueSize: 'Guddina Tarree',
      uploadedBy: 'Kan Fe\'e',
      approve: 'Raggeessi',
      reject: 'Didi',
      accessDenied: 'Qaqqabummaan Dhowwameera',
      noPermissionAdmin: 'Gabatee bulchaa qaqqabuuf hayyama hin qabdu.',
      loadingAdmin: 'Gabatee bulchaa fe\'aa jira...',
    },
    freshman: {
      title: 'Bakka Barattootaa Haaraa',
      successHub: 'Bakka Milkaa\'ina Barattootaa Haaraa',
      description: 'Waan bara jalqabaa kee barbaachisuuf hunda',
      students: 'Barattootaa 1,000+',
      resources: 'Qabeenya 500+',
      support: 'Deeggarsa 24/7',
      searchPlaceholder: 'Koorsii maqaa ykn koodiin barbaadi...',
      viewResources: 'Qabeenya Ilaali',
      hubEmpty: 'Bakki Ammaan Duwwaa',
      checkBackSoon: 'Bulchitoonni keenya meeshaalee gaggaarii bara jalqabaa keessaniif qopheessaa jiru. Yeroo gabaabaa keessatti deebi\'aa ilaalaa!',
      needSupport: 'Deeggarsa Barnoota Barbaadduu?',
      mentorshipDesc: 'Sagantaan gorsa keenyaa barattootaa haaraa barattootaa olaanoo raawwii gaarii qaban waliin gorsa dhuunfaa argachuuf walitti fida.',
      joinMentorship: 'Gorsaatti Makamaa',
      year1Resources: 'Qabeenya Bara 1',
      organizingResources: 'Qabeenya barattootaa haaraa qindeessaa jira...',
      findCourse: 'Meeshaalee, koorsiiwwan barbaadi…',
      accessResources: 'Qabeenya fi mariiwwan koorsii bara jalqabaa kanaaf qaqqabuu.',
      uploadFreshmanMaterial: 'Meeshaa Barattootaa Haaraa Fe\'i',
      year1ResourcesFor: 'Qabeenya Bara 1 Bakka Barattootaa Haaraatiif',
      materialsWillAppear: 'Meeshaaleen asitti fe\'aman fuula Koorsiiwwan Barattootaa Haaraa irratti, koorsiidhaan qindaa\'amanii mul\'atu.',
      pdfFile: 'Faayilii PDF',
      clickToChoose: 'PDF filachuuf cuqaasaa',
      pdfOnly: 'PDF qofa · Hanga 20MB',
      titleRequired: 'Mataduree *',
      exampleTitle: 'Fkn. Seensa Sagantaa - Yaadannoo Barnoota',
      descriptionLabel: 'Ibsa',
      briefDescription: 'Ibsa gabaabaa qabiyyee meeshaa...',
      universityRequired: 'Yunivarsiitii *',
      selectUniversity: 'Yunivarsiitii filadhu',
      courseRequired: 'Koorsii *',
      exampleCourse: 'Fkn. Seensa Sagantaa',
      freshmanHubUpload: 'Fe\'iinsa Bakka Barattootaa Haaraa',
      autoSetYear1: 'Ofumaan gara Bara 1tti qindaa\'ame',
      deptSetGeneral: 'Dameen gara Waliigalaatti qindaa\'ame',
      willAppearInCourses: 'Fuula Koorsiiwwan Barattootaa Haaraa irratti mul\'ata',
      organizedByCourse: 'Koodii koorsiitiin qindaa\'ame',
      uploading: 'Fe\'aa jira…',
      uploadGeneralInstead: 'Meeshaa Waliigalaa Fe\'i',
      uploadToHub: 'Gara Bakka Barattootaa Haaraatti Fe\'i',
      adminAccessOnly: 'Qaqqabummaa Bulchaa Qofa',
      onlyAdminsCanUpload: 'Bulchitoonni qofa meeshaalee gara Bakka Barattootaa Haaraatti fe\'uu danda\'u.',
      uploadGeneralMaterial: 'Meeshaa Waliigalaa Fe\'i',
      goToDashboard: 'Gara Gabateetti Deemi',
      crushFirstYear: 'Waan bara jalqabaa kee barbaachisuuf hunda. Yaadannoo, qormaata darbe, fi meeshaalee barnoota barattootaa haaraaf qophaa\'an qaqqabuu qindaa\'e argadhu.',
      curatedForFreshmen: 'barattootaa haaraaf qophaa\'e',
    },
    community: {
      leaderboard: 'Gabatee Hoggantoota Hawaasaa',
      topContributor: 'Hirmaataa Olaanaa',
      maintainStreak: 'Tartiiba kee eeguuf itti fufi!',
      searchMaterialsCourses: 'Meeshaalee, koorsiiwwan barbaadi…',
    },

    placeholders: {
      searchUsers: 'Fayyadamtoota barbaadi...',
      typeMessage: 'Ergaa kee barreessi...',
      searchMaterials: 'Meeshaalee mataduree, koorsii, ykn fe\'aatiin barbaadi...',
      searchNews: 'Oduu, scholarshipii, taateewwan barbaadi...',
      searchDiscussions: 'Mariiwwan barbaadi...',
      selectCategory: 'Ramaddii filadhu',
      selectUniversity: 'Yunivarsiitii filadhu',
      selectDepartment: 'Muummee filadhu',
      selectYear: 'Bara filadhu',
      enterTitle: 'Mataduree galchi',
      enterContent: 'Qabiyyee galchi',
      enterDescription: 'Ibsa galchi',
      enterEmail: 'Imeelii galchi',
      enterPassword: 'Jecha icciitii galchi',
      enterName: 'Maqaa galchi',
      addTags: 'Mallattoowwan dabali (Enter dhiibi)...',
      searchByAdmin: 'Maqaa bulchaa, bal\'ina gocha, ykn eenyummaa qabeenya barbaadi...',
      filterByAction: 'Gocha waliin gingilchi',
      filterByResource: 'Qabeenya waliin gingilchi',
      filterByStatus: 'Haala waliin gingilchi',
      filterByDepartment: 'Muummee waliin gingilchi',
      clickToUpload: 'Suuraa fe\'uuf cuqaasi',
      pasteImageUrl: 'Ykn URL suuraa maxxansi',
      enterExternalLink: 'https://university.edu.et/beeksisa',
      typeTagPressEnter: 'Mallattoo barreessiitii Enter dhiibi',
      shareThoughts: 'Yaada kee qooddadhu ykn furmaata kenni...',
      describeQuestion: 'Gaaffii ykn yaada kee bal\'inaan ibsi...',
      messageAIAssistant: 'Gargaaraa AI ergaa ergi...',
    },

    chat: {
      selectUser: 'Haasawa jalqabuuf fayyadamaa filadhu',
      startChatting: 'Haasawa jalqabuuf tarree fayyadamtootaa irraa nama tokko filadhu',
      chooseFromList: 'Haasawa jalqabuuf tarree fayyadamtootaa irraa nama tokko filadhu',
      noMessagesYet: 'Ergaan hin jiru. Haasawa jalqabi!',
      startConversation: 'Ergaan hin jiru',
      chatUsers: 'Fayyadamtoota Haasawaa',
      noUsersAvailable: 'Fayyadamtoonni haasawaaf hin jiran',
      noUsersMatch: 'Fayyadamtoonni barbaacha kee waliin wal hin simne',
      online: 'Toora Irra',
      offline: 'Toora Ala',
      send: 'Ergi',
    },

    adminActivity: {
      title: 'Galmee Gocha Bulchaa',
      subtitle: 'Gochaalee bulchiinsaa fi jijjiirama hunda hordofi',
      activities: 'gochaalee',
      searchPlaceholder: 'Maqaa bulchaa, bal\'ina gocha, ykn eenyummaa qabeenya barbaadi...',
      allActions: 'Gochaalee Hunda',
      create: 'Uumi',
      update: 'Haaromsi',
      delete: 'Haqi',
      grantPermission: 'Hayyama Kenni',
      revokePermission: 'Hayyama Fuudhi',
      allResources: 'Qabeenya Hunda',
      users: 'Fayyadamtoota',
      materials: 'Meeshaalee',
      messages: 'Ergaalee',
      permissions: 'Hayyamawwan',
      noActivitiesFound: 'Gochaaleen Hin Argamne',
      noActivitiesRecorded: 'Gochaaleen bulchiinsaa amma hin galmeeffamne.',
      noActivitiesMatch: 'Gochaaleen ulaagaa barbaacha kee waliin wal hin simne.',
      resourceId: 'Eenyummaa Qabeenya',
    },

    materialsManagement: {
      searchPlaceholder: 'Meeshaalee mataduree, koorsii, ykn fe\'aatiin barbaadi...',
      allStatus: 'Haala Hunda',
      approved: 'Ragga\'e',
      pending: 'Eegaa Jiru',
      rejected: 'Diddame',
      flagged: 'Mallattaa\'e',
      allDepartments: 'Muummiiwwan Hunda',
      noMaterialsFound: 'Meeshaaleen Hin Argamne',
      noMaterialsUploaded: 'Meeshaaleen sirnicha keessatti amma hin fe\'amne.',
      noMaterialsMatch: 'Meeshaaleen ulaagaa barbaacha kee waliin wal hin simne.',
      topRated: 'Sadarkaa Olaanaa',
      downloads: 'buufannoo',
      materialDetails: 'Bal\'ina Meeshaa',
      title: 'Mataduree',
      course: 'Koorsii',
      department: 'Muummee',
      year: 'Bara',
      uploader: 'Fe\'aa',
      uploadDate: 'Guyyaa Fe\'ame',
      description: 'Ibsa',
      stats: 'Istaatistiksii',
      rating: 'Sadarkaa',
      reviews: 'Gamaaggama',
      fileSize: 'Guddina Faayilii',
      fileName: 'Maqaa Faayilii',
      fileType: 'Gosa Faayilii',
      contentModeration: 'To\'annoo Qabiyyee',
      approve: 'Raggeessi',
      flag: 'Mallattoo Godhi',
      reject: 'Didi',
      viewFile: 'Faayilii Ilaali',
      download: 'Buufadhu',
      analytics: 'Xiinxala',
      deleteMaterial: 'Meeshaa Haqi',
      deleteConfirmation: 'Meeshaa Haqi',
      deleteWarning: 'Meeshaa kana yeroo hundaaf haquu barbaaddaa? Gochi kun hin deebi\'amu fi sadarkaa, gamaaggama, istaatistiksii buufannoo, fi mallattoowwan walqabatan hunda ni haqa.',
      deletePermanently: 'Yeroo Hundaaf Haqi',
    },

    featureRequest: {
      title: 'Amala Fooyya\'aa Gaafadhu',
      featureTitle: 'Mataduree Amalaa',
      description: 'Ibsa',
      priority: 'Dursa',
      lowPriority: 'Dursa Gadi',
      mediumPriority: 'Dursa Giddu Galeessa',
      highPriority: 'Dursa Olaanaa',
      material: 'Meeshaa',
      reviewNote: 'Gaaffiin kee bulchitootaan ni gamaaggamama fi fooyya\'iinsa gara fuula duraatti raawwatamuu danda\'a.',
      submitRequest: 'Gaaffii Galchi',
      submitting: 'Galchaa jira...',
      titlePlaceholder: 'Fkn., Hojii barbaacha dabali',
      descriptionPlaceholder: 'Amala meeshaa kana ykn waltajjii keessatti dabalamuu barbaaddu ibsi...',
    },

    aiChat: {
      greeting: 'Akkam! Ani gargaaraa AI EduNexus keessan. Waltajjii keessa deemuu, meeshaalee barnoota argachuu, GPA shallaguu, fi sirna badhaasa keenyaa hubachuuf isin gargaaruuf as jira. Akkamiin isin gargaaruu danda\'a?',
      online: 'Toora Irra',
      clickToExpand: 'Bal\'isuuf cuqaasi',
      aiAssistant: 'Gargaaraa AI',
      poweredBy: 'Humna EduNexus AI',
      pressEnter: 'Erguuf Enter dhiibi',
    },

    newsPage: {
      createNews: 'Barreeffama Oduu Uumi',
      editNews: 'Barreeffama Oduu Gulaali',
      backToNews: 'Gara Oduutti Deebi\'i',
      shareUpdates: 'Fooyya\'iinsa barbaachisaa barattootaan qooddadhu',
      updateInfo: 'Odeeffannoo oduu haaromsi',
      titleRequired: 'Matadureen barbaachisaa dha',
      summary: 'Cuunfaa',
      summaryPlaceholder: 'Ibsa gabaabaa (kaardii oduu irratti mul\'ata)',
      summaryHelper: 'Dirqala miti: Cuunfaa gabaabaa kaardii durargii',
      categoryRequired: 'Ramaddiin barbaachisaa dha',
      universityRequired: 'Yunivarsiitiin barbaachisaa dha',
      contentRequired: 'Qabiyyeen barbaachisaa dha',
      fullContent: 'Qabiyyee',
      contentPlaceholder: 'Qabiyyee oduu guutuu...',
      contentHelper: 'Bal\'ina guutuu beeksisa oduu',
      coverImage: 'Suuraa Uwwisaa',
      clickToUploadImage: 'Suuraa fe\'uuf cuqaasi',
      imageFormat: 'PNG, JPG, GIF hanga 5MB',
      chooseImage: 'Suuraa Filadhu',
      orPasteUrl: 'Ykn URL suuraa maxxansi',
      externalLink: 'Hidhaa Alaa',
      externalLinkPlaceholder: 'https://university.edu.et/beeksisa',
      externalLinkHelper: 'Dirqala miti: Hidhaa fuula ogeessaa',
      deadline: 'Yeroo Xumuraa',
      deadlineHelper: 'Iyyannoo/galmaa\'iinsaaf',
      eventDate: 'Guyyaa Taateewaa',
      eventDateHelper: 'Yeroo taatewichi raawwatamu',
      tags: 'Mallattoowwan',
      tagsHelper: 'Oduu kee ramadduuf mallattoowwan dabali (fkn., scholarshipii, graduate, injinariingii)',
      add: 'Dabali',
      featuredNews: 'Oduu Mul\'ataa',
      featuredHelper: 'Oduu kana carousel mul\'ataa keessatti agarsiisi',
      publishedNews: 'Maxxanfame',
      publishedHelper: 'Oduu kana fayyadamtoota hundaaf mul\'isu',
      cancel: 'Dhiisi',
      publishNews: 'Oduu Maxxansi',
      publishing: 'Maxxansaa jira...',
      uploadingImage: 'Suuraa Fe\'aa jira...',
      saveChanges: 'Jijjiirama Olkaa\'i',
      saving: 'Olkaa\'aa jira...',
      accessDenied: 'Qaqqabummaan Diddame',
      onlyAdmins: 'Bulchitoonni qofa barreeffama oduu uumuu danda\'u.',
      loadingNews: 'Oduu fe\'aa jira...',
      titlePlaceholder: 'Fkn., Carraa Scholarshipii Haaraa Barattootaa Digrii Lammaffaatiif',
      tagAlreadyAdded: 'Mallattoon duraan dabalamee jira',
      maxTagsAllowed: 'Mallattoowwan 10 qofa hayyamamu',
      imageRequired: 'Maaloo faayilii suuraa filadhu',
      imageSizeLimit: 'Suuraan 5MB gadi ta\'uu qaba',
    },

    newsFilters: {
      searchPlaceholder: 'Oduu, scholarshipii, taateewwan barbaadi...',
      allCategories: 'Ramaddiiwwan Hunda',
      admissions: '🎓 Galmaa\'iinsa',
      scholarships: '💰 Scholarshipii',
      events: '📅 Taateewwan',
      deadlines: '⏰ Yeroo Xumuraa',
      announcements: '📢 Beeksisa',
      allUniversities: 'Yunivarsiitii Hunda',
      clearFilters: 'Gingilcha Qulqulleessi',
    },

    discussionDetail: {
      backToDiscussions: 'Gara Mariiwwanitti Deebi\'i',
      likes: 'Jaallata',
      like: 'Jaallata',
      comments: 'Yaada',
      joinConversation: 'Haasawa Keessa Seeni',
      shareThoughtsPlaceholder: 'Yaada kee qooddadhu ykn furmaata kenni...',
      postComment: 'Yaada Maxxansi',
      posting: 'Maxxansaa jira...',
      noCommentsYet: 'Yaadni hin jiru. Jalqabaa deebii kenni!',
      beFirstToReply: 'Jalqabaa deebii kenni!',
      discussionNotFound: 'Mariiwwan hin argamne',
      loadingDiscussion: 'Mariiwwan fe\'aa jira...',
      hidden: 'Dhokfame',
      hiddenUntil: 'hanga',
      unhidePost: 'Barreeffama Mul\'isi',
      hidePost: 'Barreeffama Dhoksi',
      deletePost: 'Barreeffama Haqi',
      deleteConfirmation: 'Barreeffama Mariiwwanii Haqi',
      deleteWarning: 'Barreeffama kana haquu barbaaddaa? Gochi kun hin deebi\'amu. Yaadnii fi jaallanni hundi yeroo hundaaf ni haqamu.',
      hidePostTitle: 'Barreeffama Mariiwwanii Dhoksi',
      hidePostDescription: 'Barreeffama kana fayyadamtoota idilee irraa dhoksi. Yeroo murteessuu ykn yeroo hin murteessine dhoksuu dandeessa.',
      hideDuration: 'Yeroo Dhoksuu (sa\'aatii)',
      hideDurationPlaceholder: 'Yeroo hin murteessineef duwwaa dhiisi',
      hideDurationHelper: 'Yeroo hin murteessineef dhoksuu duwwaa dhiisi. Sa\'aatii galchi (fkn., 24 guyyaa 1f, 168 torban 1f)',
      hiding: 'Dhoksaa jira...',
      deleting: 'Haqaa jira...',
    },

    postForm: {
      title: 'Mataduree',
      titleHelper: 'Ifaafi qulqulluu ta\'i',
      titlePlaceholder: 'Fkn., Haala walxaxaa React keessatti akkamitti qabdu?',
      content: 'Qabiyyee',
      contentPlaceholder: 'Gaaffii ykn yaada kee bal\'inaan ibsi...',
      tags: 'Mallattoowwan',
      tagsPlaceholder: 'Mallattoowwan dabali (Enter dhiibi)...',
      earnPoints: 'Barreeffama mariiwwanii haaraa hundaaf qabxii 5 argadhu!',
      cancel: 'Dhiisi',
      createPost: 'Barreeffama Uumi',
      posting: 'Maxxansaa jira...',
    },

    adminSetup: {
      adminSetup: 'Qophii Bulchaa',
      enterAdminKey: 'Mirga bulchiinsaa argachuuf furtuu bulchaa galchi',
      adminKey: 'Furtuu Bulchaa',
      adminKeyPlaceholder: 'Furtuu bulchaa galchi...',
      grantAccess: 'Qaqqabummaa Bulchaa Kenni',
      grantingAccess: 'Qaqqabummaa Kennaa jira...',
      adminAccessGranted: 'Qaqqabummaan Bulchaa Kennameera',
      youHaveAdmin: 'Mirga bulchiinsaa qabda. Gabatee bulchaa menu navigeeshinii irraa qaqqabi.',
      goToAdminDashboard: 'Gara Gabatee Bulchaatti Deemi',
      forDemo: 'Agarsiisaaf:',
      adminKeyIs: 'Furtuu bulchaa',
    },
    buttons: {
      save: 'Olkaa\'i',
      cancel: 'Dhiisi',
      delete: 'Haqi',
      edit: 'Gulaali',
      upload: 'Fe\'i',
      download: 'Buufadhu',
      share: 'Qooddadhu',
      bookmark: 'Mallattoo Godhi',
      unbookmark: 'Mallattoo Haqi',
      like: 'Jaalladhu',
      unlike: 'Jaalala Haqi',
      comment: 'Yaada Kenni',
      reply: 'Deebii Kenni',
      report: 'Gabaasi',
      approve: 'Raggeessi',
      reject: 'Didi',
      hide: 'Dhoksi',
      unhide: 'Mul\'isi',
      viewMore: 'Dabalata Ilaali',
      loadMore: 'Dabalata Fe\'i',
      refresh: 'Haaromsi',
      filter: 'Calaqqisiisi',
      sort: 'Tartiibaan Qindeessi',
      export: 'Ergadhu',
      import: 'Galchi',
      print: 'Maxxansi',
      copy: 'Garagalchi',
      paste: 'Maxxansi',
      cut: 'Muri',
      undo: 'Duubatti Deebisi',
      redo: 'Irra Deebi\'ii Godhi',
    },
    messages: {
      profileUpdated: 'Piroofaayiliin haaromfameera!',
      settingsSaved: 'Qindaa\'inni olkaa\'ameera!',
      passwordChanged: 'Jecha icciitiin jijjiiramee!',
      materialUploaded: 'Meeshaan fe\'ameera!',
      materialDeleted: 'Meeshaan haqameera!',
      bookmarkAdded: 'Mallattoon ida\'ameera!',
      bookmarkRemoved: 'Mallattoon haqameera!',
      commentAdded: 'Yaadni ida\'ameera!',
      commentDeleted: 'Yaadni haqameera!',
      postCreated: 'Barreeffamni uumameera!',
      postDeleted: 'Barreeffamni haqameera!',
      errorOccurred: 'Dogongorri uumameera',
      tryAgain: 'Maaloo irra deebi\'ii yaali',
      confirmDelete: 'Haquu Mirkaneessi',
      cannotUndo: 'Gocha kana duubatti deebisuu hin dandeessu',
      areYouSure: 'Mirkaneessitaa?',
      loginRequired: 'Seenuun Barbaachisaa',
      pleaseLogin: 'Itti fufuuf maaloo seeni',
      accessDenied: 'Qaqqabummaan Dhowwameera',
      noPermission: 'Hayyama hin qabdu',
      networkError: 'Dogongora Networkii',
      checkConnection: 'Maaloo walitti hidhamiinsa kee ilaali',
    },
    footer: {
      product: 'Oomisha',
      account: 'Herrega',
      features: 'Amaloota',
      aboutUs: 'Waa\'ee Keenya',
      contactUs: 'Nu Quunnamaa',
      privacyPolicy: 'Imaammata Dhuunfachisummaa',
      termsOfService: 'Haala Tajaajilaa',
      helpCenter: 'Gargaarsa Bakka',
      builtFor: 'Barattootaa Itoophiyaatiif ijaarame',
      allRightsReserved: 'Mirgi hundi eegameera',
      professionalPlatform: 'Waltajjii tumaalee barattootaa ogeessaa',
      modernPlace: 'Bakka ammayyaa fi ogeessaa barattoonni Itoophiyaa itti baratan, meeshaalee qooddatan, fi hiriyyootaa fi AI irraa gargaarsa argatan.',
      joinNow: 'Amma makamaa',
      getFullAccess: 'Meeshaalee, haasawa, fi deeggarsa AI guutuutti qaqqabuu.',
      createFreeAccount: 'Herrega bilisaa uumaa',
    },
  },

  // Amharic (አማርኛ)
  am: {
    common: {
      appName: 'EduNexus',
      welcome: 'እንኳን ደህና መጡ',
      loading: 'በመጫን ላይ...',
      save: 'አስቀምጥ',
      cancel: 'ሰርዝ',
      delete: 'ሰርዝ',
      edit: 'አርትዕ',
      search: 'ፈልግ',
      filter: 'አጣራ',
      back: 'ተመለስ',
      next: 'ቀጣይ',
      submit: 'ላክ',
      close: 'ዝጋ',
      yes: 'አዎ',
      no: 'አይ',
      ok: 'እሺ',
      error: 'ስህተት',
      success: 'ተሳክቷል',
      viewDetails: 'ዝርዝር ይመልከቱ',
      learnMore: 'ተጨማሪ ይወቁ',
      getStarted: 'ጀምር',
      readMore: 'ተጨማሪ ያንብቡ',
      seeAll: 'ሁሉንም ይመልከቱ',
      noResults: 'ምንም ውጤት አልተገኘም',
      tryAgain: 'እንደገና ይሞክሩ',
    },
    nav: {
      home: 'መነሻ',
      dashboard: 'ዳሽቦርድ',
      materials: 'የትምህርት ቁሳቁሶች',
      upload: 'ስቀል',
      discussions: 'ውይይቶች',
      news: 'ዜና',
      profile: 'መገለጫ',
      settings: 'ቅንብሮች',
      logout: 'ውጣ',
      login: 'ግባ',
      register: 'ተመዝገብ',
      gpaCalculator: 'የGPA ማስሊያ',
      freshmanHub: 'የአዲስ ተማሪዎች ማዕከል',
      admin: 'አስተዳዳሪ',
      globalChat: 'አለም አቀፍ ውይይት',
      projects: 'ፕሮጀክቶች',
      features: 'ባህሪያት',
      logIn: 'ግባ',
      signOut: 'ውጣ',
      notifications: 'ማሳወቂያዎች',
      noNotifications: 'ምንም ማሳወቂያ የለም',
      markAsRead: 'እንደተነበበ ምልክት አድርግ',
      viewAllNotifications: 'ሁሉንም ማሳወቂያዎች ይመልከቱ',
    },
    auth: {
      login: 'ግባ',
      register: 'ተመዝገብ',
      logout: 'ውጣ',
      email: 'ኢሜይል',
      password: 'የይለፍ ቃል',
      confirmPassword: 'የይለፍ ቃል አረጋግጥ',
      fullName: 'ሙሉ ስም',
      university: 'ዩኒቨርሲቲ',
      department: 'ትምህርት ክፍል',
      year: 'ዓመት',
      forgotPassword: 'የይለፍ ቃል ረሱ?',
      rememberMe: 'አስታውሰኝ',
      dontHaveAccount: 'መለያ የለዎትም?',
      alreadyHaveAccount: 'ቀድሞውኑ መለያ አለዎት?',
      signInWithGoogle: 'በGoogle ግባ',
      loginSuccess: 'በተሳካ ሁኔታ ገብተዋል!',
      registerSuccess: 'ምዝገባ ተሳክቷል!',
      logoutSuccess: 'በተሳካ ሁኔታ ወጥተዋል',
      invalidCredentials: 'ኢሜይል ወይም የይለፍ ቃል ትክክል አይደለም',
      createAccount: 'መለያ ፍጠር',
      signIn: 'ግባ',
      selectUniversity: 'ዩኒቨርሲቲ ይምረጡ',
      selectDepartment: 'ትምህርት ክፍል ይምረጡ',
      selectYear: 'ዓመት ይምረጡ',
    },
    dashboard: {
      title: 'ዳሽቦርድ',
      welcome: 'እንኳን ደህና ተመለሱ',
      quickStats: 'ፈጣን ስታቲስቲክስ',
      recentMaterials: 'የቅርብ ጊዜ ቁሳቁሶች',
      recentDiscussions: 'የቅርብ ጊዜ ውይይቶች',
      upcomingEvents: 'የሚመጡ ዝግጅቶች',
      myProgress: 'እድገቴ',
      totalPoints: 'ጠቅላላ ነጥቦች',
      materialsUploaded: 'የተሰቀሉ ቁሳቁሶች',
      bookmarked: 'የተመለከቱ',
      discussions: 'ውይይቶች',
      viewAll: 'ሁሉንም ይመልከቱ',
      noMaterials: 'ገና ቁሳቁስ የለም',
      noDiscussions: 'ገና ውይይት የለም',
      uploadFirst: 'የመጀመሪያ ቁሳቁስዎን ይስቀሉ',
      startDiscussion: 'ውይይት ይጀምሩ',
    },
    materials: {
      title: 'የትምህርት ቁሳቁሶች',
      uploadMaterial: 'ቁሳቁስ ስቀል',
      searchMaterials: 'ቁሳቁሶችን ፈልግ...',
      filterByDepartment: 'በትምህርት ክፍል አጣራ',
      filterByYear: 'በዓመት አጣራ',
      filterByCourse: 'በኮርስ አጣራ',
      noMaterials: 'ምንም ቁሳቁስ አልተገኘም',
      downloadMaterial: 'አውርድ',
      viewDetails: 'ዝርዝር ይመልከቱ',
      rating: 'ደረጃ',
      downloads: 'ማውረጃዎች',
      uploadedBy: 'ያስቀመጠው',
      uploadDate: 'የተሰቀለበት ቀን',
      allDepartments: 'ሁሉም ትምህርት ክፍሎች',
      allYears: 'ሁሉም ዓመታት',
      allCourses: 'ሁሉም ኮርሶች',
      sortBy: 'ደርድር በ',
      newest: 'አዲስ',
      oldest: 'ቆይቶ',
      mostDownloaded: 'በጣም የተወረደ',
      highestRated: 'ከፍተኛ ደረጃ',
      materialType: 'የቁሳቁስ አይነት',
      notes: 'ማስታወሻዎች',
      pastPapers: 'ያለፉ ፈተናዎች',
      assignments: '과제',
      books: 'መጽሐፍት',
      other: 'ሌላ',
      browseFilter: 'ሁሉንም ስቀላዎች ያስሱ፣ ያጣሩ እና ይፈልጉ',
      filters: 'ማጣሪያዎች',
      clearFilters: 'አጽዳ',
      university: 'ዩኒቨርሲቲ',
      anyUniversity: 'ማንኛውም ዩኒቨርሲቲ',
      anyDepartment: 'ማንኛውም ትምህርት ክፍል',
      anyYear: 'ማንኛውም ዓመት',
      results: 'ውጤቶች',
      result: 'ውጤት',
      noMatch: 'ምንም ቁሳቁስ ከማጣሪያዎችዎ ጋር አይዛመድም።',
      loginRequired: 'መግባት ያስፈልጋል',
      loginRequiredDesc: 'የትምህርት ቁሳቁሶችን ለመድረስ መለያ መፍጠር ያስፈልግዎታል',
      logIn: 'ግባ',
      signUp: 'ተመዝገብ',
    },
    settings: {
      title: 'ቅንብሮች',
      profile: 'መገለጫ',
      notifications: 'ማሳወቂያዎች',
      security: 'ደህንነት',
      preferences: 'ምርጫዎች',
      language: 'ቋንቋ',
      darkMode: 'ጨለማ ሁነታ',
      emailNotifications: 'የኢሜይል ማሳወቂያዎች',
      pushNotifications: 'የግፊት ማሳወቂያዎች',
      publicProfile: 'ይፋዊ መገለጫ',
      showEmail: 'ኢሜይል በይፋ አሳይ',
      changePassword: 'የይለፍ ቃል ቀይር',
      currentPassword: 'የአሁኑ የይለፍ ቃል',
      newPassword: 'አዲስ የይለፍ ቃል',
      confirmNewPassword: 'አዲስ የይለፍ ቃል አረጋግጥ',
      twoFactorAuth: 'ባለሁለት ደረጃ ማረጋገጫ',
      enable2FA: 'ባለሁለት ደረጃ ማረጋገጫ አንቃ',
      disable2FA: 'ባለሁለት ደረጃ ማረጋገጫ አሰናክል',
      saveChanges: 'ለውጦችን አስቀምጥ',
      profileInformation: 'የመገለጫ መረጃ',
      updatePersonalInfo: 'የግል መረጃዎን ያዘምኑ',
      privacyVisibility: 'ግላዊነት እና ታይነት',
      allowOthersView: 'ሌሎች መገለጫዎን እንዲመለከቱ ፍቀድ',
      showActivity: 'እንቅስቃሴ አሳይ',
      displayActivity: 'እንቅስቃሴዎን በመገለጫዎ ላይ አሳይ',
      accountData: 'የመለያ ውሂብ',
      exportData: 'ውሂብ ላክ',
      downloadCopy: 'የውሂብዎን ቅጂ ያውርዱ',
      deleteAccount: 'መለያ ሰርዝ',
      permanentlyDelete: 'መለያዎን በቋሚነት ሰርዝ',
      notificationPreferences: 'የማሳወቂያ ምርጫዎች',
      chooseNotifications: 'የትኞቹን ማሳወቂያዎች እንደሚቀበሉ ይምረጡ',
      materialUpdates: 'የቁሳቁስ ማሻሻያዎች',
      newMaterials: 'በትምህርት ክፍልዎ ውስጥ አዲስ ቁሳቁሶች',
      newMessages: 'አዲስ መልዕክቶች',
      weeklyDigest: 'ሳምንታዊ ማጠቃለያ',
      securitySettings: 'የደህንነት ቅንብሮች',
      managePassword: 'የይለፍ ቃልዎን እና ደህንነትዎን ያስተዳድሩ',
      addExtraSecurity: 'ተጨማሪ የደህንነት ደረጃ ያክሉ',
      activeSessions: 'ንቁ ክፍለ ጊዜዎች',
      manageSessions: 'ንቁ ክፍለ ጊዜዎችዎን ያስተዳድሩ',
      currentSession: 'የአሁኑ ክፍለ ጊዜ',
      appearance: 'መልክ',
      enableDarkTheme: 'ጨለማ ገጽታን አንቃ',
      languageRegion: 'ቋንቋ እና ክልል',
      selectLanguage: 'የሚመርጡትን ቋንቋ ይምረጡ',
      displayOptions: 'የማሳያ አማራጮች',
      itemsPerPage: 'በገጽ ላይ ያሉ ንጥሎች',
      showEmailProfile: 'ኢሜይል በመገለጫ ላይ አሳይ',
    },
    profile: {
      title: 'መገለጫ',
      editProfile: 'መገለጫ አርትዕ',
      bio: 'ስለ እኔ',
      points: 'ነጥቦች',
      uploads: 'ስቀላዎች',
      bookmarks: 'ምልክቶች',
      badges: 'ባጆች',
      activity: 'እንቅስቃሴ',
      myUploads: 'የእኔ ስቀላዎች',
      myBookmarks: 'የእኔ ምልክቶች',
      recentActivity: 'የቅርብ ጊዜ እንቅስቃሴ',
      level: 'ደረጃ',
      nextLevel: 'ቀጣይ ደረጃ',
      progressToNext: 'ወደ ቀጣይ ደረጃ እድገት',
      morePoints: 'ተጨማሪ ነጥቦች ያስፈልጋሉ',
      achievements: 'ስኬቶች',
      noUploads: 'ገና ስቀላ የለም',
      noBookmarks: 'ገና ምልክት የለም',
      noActivity: 'ገና እንቅስቃሴ የለም',
      uploadFirst: 'የመጀመሪያ ቁሳቁስዎን ይስቀሉ',
      bookmarkMaterials: 'አንዳንድ ቁሳቁሶችን ምልክት ያድርጉ',
      startActivity: 'እንቅስቃሴዎን ይጀምሩ',
      uploaded: 'ተስቅሏል',
      bookmarked: 'ምልክት ተደርጓል',
      changeCover: 'ሽፋን ቀይር',
      joinedDate: 'የተቀላቀለበት',
    },
    home: {
      heroTitle: 'ወደ EduNexus እንኳን በደህና መጡ',
      heroSubtitle: 'የአካዳሚክ ስኬትዎ መድረክ',
      heroDescription: 'ከኢትዮጵያ ተማሪዎች ጋር ይገናኙ፣ ይማሩ እና ያድጉ',
      joinNow: 'አሁን ይቀላቀሉ',
      exploreFeatures: 'ባህሪያትን ያስሱ',
      featuresTitle: 'የሚያስፈልግዎት ሁሉ',
      featuresSubtitle: 'ለአካዳሚክ ጉዞዎ ኃይለኛ ባህሪያት',
      feature1Title: 'የትምህርት ቁሳቁሶች',
      feature1Description: 'ጥራት ያላቸውን የትምህርት ቁሳቁሶች ያግኙ እና ያጋሩ',
      feature2Title: 'ውይይቶች',
      feature2Description: 'ትርጉም ባላቸው የአካዳሚክ ውይይቶች ይሳተፉ',
      feature3Title: 'የGPA ማስሊያ',
      feature3Description: 'የአካዳሚክ አፈጻጸምዎን ይከታተሉ',
      feature4Title: 'የAI ረዳት',
      feature4Description: 'ከAI አስተማሪያችን ፈጣን እገዛ ያግኙ',
      howItWorksTitle: 'እንዴት ይሰራል',
      howItWorksSubtitle: 'በሶስት ቀላል ደረጃዎች ይጀምሩ',
      step1Title: 'መለያ ይፍጠሩ',
      step1Description: 'በዩኒቨርሲቲ ኢሜልዎ ይመዝገቡ',
      step2Title: 'ይዘትን ያስሱ',
      step2Description: 'ቁሳቁሶችን ያስሱ እና ውይይቶችን ይቀላቀሉ',
      step3Title: 'አስተዋፅዖ ያድርጉ እና ይማሩ',
      step3Description: 'እውቀትን ያጋሩ እና ነጥቦችን ያግኙ',
      testimonialTitle: 'ተማሪዎች ምን ይላሉ',
      testimonialSubtitle: 'በሺዎች የሚቆጠሩ እርካታ ያላቸው ተማሪዎችን ይቀላቀሉ',
      ctaTitle: 'ለመጀመር ዝግጁ ነዎት?',
      ctaSubtitle: 'ዛሬ EduNexusን ይቀላቀሉ እና ትምህርትዎን ይለውጡ',
      ctaButton: 'ነጻ መለያ ይፍጠሩ',
      featuredUniversities: 'ተለይተው የቀረቡ ዩኒቨርሲቲዎች',
      clickUniversity: 'ቁሳቁሶቻቸውን ለማሰስ ማንኛውንም ዩኒቨርሲቲ ጠቅ ያድርጉ',
      swipeExplore: 'ለማሰስ ያንሸራትቱ',
      allUniversities: 'ሁሉም ዩኒቨርሲቲዎች',
      projectsCommunity: 'ፕሮጀክቶች እና ማህበረሰብ',
      modernInitiatives: 'ተማሪዎችን፣ የAI ድጋፍን እና የትብብር ትምህርትን የሚያገናኙ ዘመናዊ ተነሳሽነቶች',
      studentChat: 'የተማሪዎች ውይይት',
      studentChatDesc: 'ከክፍል ጓደኞች ጋር ይገናኙ፣ ግብዓቶችን ያጋሩ፣ የፈተና ምክሮችን ይጠይቁ እና የኮርስ ውይይቶችን ያደራጁ',
      openChat: 'የውይይት ተሞክሮ ክፈት',
      aiAssistant: 'የAI ወኪል ረዳት',
      aiAssistantDesc: 'ስለ ኮርሶች፣ ቁሳቁሶችን እንዴት መስቀል እንደሚቻል እና የጥናት እቅድ ጥያቄዎችን ይጠይቁ። የAI ረዳቱ ወዲያውኑ ይገኛል',
      aiAssistantNote: 'በቀኝ በኩል ጥግ ላይ ያለውን ተንሳፋፊ የAI ውይይት ቁልፍ ይጠቀሙ',
      campusProjects: 'የካምፓስ ፕሮጀክቶች',
      campusProjectsDesc: 'በዩኒቨርሲቲ የሚመሩ የፕሮጀክት ማሳያዎችን፣ የትብብር ፈጠራዎችን እና የእውቀት መጋራት ፕሮግራሞችን ያስሱ',
      exploreProjects: 'የፕሮጀክት ግብዓቶችን ያስሱ',
      nationwide: 'በሀገር አቀፍ ደረጃ',
    },
    upload: {
      title: 'ቁሳቁስ ስቀል',
      uploadMaterial: 'አዲስ ቁሳቁስ ስቀል',
      materialTitle: 'የቁሳቁስ ርዕስ',
      description: 'መግለጫ',
      course: 'ኮርስ',
      department: 'ትምህርት ክፍል',
      year: 'ዓመት',
      materialType: 'የቁሳቁስ አይነት',
      selectFile: 'ፋይል ይምረጡ',
      uploadButton: 'ስቀል',
      uploading: 'በመስቀል ላይ...',
      uploadSuccess: 'መስቀል ተሳክቷል!',
      uploadError: 'መስቀል አልተሳካም',
      dragDrop: 'ፋይሎችን እዚህ ይጎትቱ እና ይጣሉ',
      fileSelected: 'ፋይል ተመርጧል',
      maxSize: 'ከፍተኛ መጠን: 10MB',
      supportedFormats: 'የሚደገፉ ቅርጸቶች: PDF, DOC, DOCX, PPT, PPTX',
      pdfFile: 'የPDF ፋይል',
      clickToChoose: 'PDF ለመምረጥ ጠቅ ያድርጉ',
      pdfOnly: 'PDFs ብቻ · ከፍተኛ 20MB',
      quickSummary: 'ስለ ይዘቱ አጭር ማጠቃለያ...',
      selectUniversity: 'ይምረጡ',
      selectDepartment: 'ይምረጡ',
      selectYear: 'ይምረጡ',
      reviewNote: 'ከተማሪ ጓደኞችዎ ጋር PDF ያጋሩ — ይፋ ከመሆኑ በፊት በአስተዳዳሪ ይገመገማል።',
      freshmanUploadLink: 'የዓመት 1 ቁሳቁሶችን መስቀል ይፈልጋሉ? የአዲስ ተማሪ መስቀያን ይጠቀሙ →',
      restrictedMessage: 'በአስተዳዳሪ ቁሳቁሶችን ከመስቀል ተገድበዋል።',
    },
    discussions: {
      title: 'ውይይቶች',
      createPost: 'ልጥፍ ፍጠር',
      searchDiscussions: 'ውይይቶችን ፈልግ...',
      filterByTopic: 'በርዕስ አጣራ',
      noDiscussions: 'ምንም ውይይት አልተገኘም',
      startFirst: 'የመጀመሪያውን ውይይት ጀምር',
      postTitle: 'የልጥፍ ርዕስ',
      postContent: 'የልጥፍ ይዘት',
      selectTopic: 'ርዕስ ይምረጡ',
      publish: 'አትም',
      comments: 'አስተያየቶች',
      views: 'እይታዎች',
      postedBy: 'ያተመው',
      postedOn: 'የታተመበት',
      addComment: 'አስተያየት ያክሉ',
      writeComment: 'አስተያየትዎን ይፃፉ...',
      reply: 'መልስ',
      edit: 'አርትዕ',
      delete: 'ሰርዝ',
      report: 'ሪፖርት',
      share: 'አጋራ',
      allTopics: 'ሁሉም ርዕሶች',
      general: 'አጠቃላይ',
      academic: 'አካዳሚክ',
      career: 'ሙያ',
      social: 'ማህበራዊ',
    },
    news: {
      title: 'ዜና እና ማሻሻያዎች',
      latestNews: 'የቅርብ ጊዜ ዜና',
      searchNews: 'ዜና ፈልግ...',
      filterByCategory: 'በምድብ አጣራ',
      noNews: 'ምንም ዜና አልተገኘም',
      readMore: 'ተጨማሪ ያንብቡ',
      publishedOn: 'የታተመበት',
      category: 'ምድብ',
      allCategories: 'ሁሉም ምድቦች',
      admission: 'መግቢያ',
      scholarship: 'ስኮላርሺፕ',
      event: 'ዝግጅት',
      deadline: 'የመጨረሻ ቀን',
      announcement: 'ማስታወቂያ',
      featured: 'ተለይቶ የቀረበ',
      tags: 'መለያዎች',
      relatedNews: 'ተዛማጅ ዜና',
      shareNews: 'ዜና አጋራ',
      saveNews: 'ዜና አስቀምጥ',
      eventDate: 'የዝግጅት ቀን',
      deadlineDate: 'የመጨረሻ ቀን',
    },
    gpa: {
      title: 'የGPA ማስሊያ',
      calculator: 'GPAዎን ያስሉ',
      addCourse: 'ኮርስ ያክሉ',
      courseName: 'የኮርስ ስም',
      creditHours: 'የክሬዲት ሰዓቶች',
      grade: 'ደረጃ',
      remove: 'አስወግድ',
      calculate: 'አስላ',
      yourGPA: 'የእርስዎ GPA',
      totalCredits: 'ጠቅላላ ክሬዲቶች',
      semesterGPA: 'የሴሚስተር GPA',
      cumulativeGPA: 'የተጠራቀመ GPA',
      gradingScale: 'የደረጃ አሰጣጥ ሚዛን',
      performanceGuide: 'የአፈጻጸም መመሪያ',
      excellent: 'በጣም ጥሩ',
      veryGood: 'በጣም ጥሩ',
      good: 'ጥሩ',
      satisfactory: 'አጥጋቢ',
      pass: 'ያለፈ',
      fail: 'ያልተሳካ',
      proTips: 'ፕሮ ምክሮች',
      tip1: 'በከፍተኛ ክሬዲት ኮርሶች ላይ ያተኩሩ',
      tip2: 'ወጥነት ያለው አፈጻጸም ይጠብቁ',
      tip3: 'ችግር ካለብዎት ቀድመው እገዛ ይጠይቁ',
    },
    admin: {
      title: 'የአስተዳዳሪ ዳሽቦርድ',
      dashboard: 'ዳሽቦርድ',
      users: 'ተጠቃሚዎች',
      materials: 'ቁሳቁሶች',
      discussions: 'ውይይቶች',
      news: 'ዜና',
      statistics: 'ስታቲስቲክስ',
      totalUsers: 'ጠቅላላ ተጠቃሚዎች',
      totalMaterials: 'ጠቅላላ ቁሳቁሶች',
      pendingApprovals: 'በመጠባበቅ ላይ ያሉ ፈቃዶች',
      totalDiscussions: 'ጠቅላላ ውይይቶች',
      searchUsers: 'ተጠቃሚዎችን ፈልግ...',
      filterByRole: 'በሚና አጣራ',
      allRoles: 'ሁሉም ሚናዎች',
      students: 'ተማሪዎች',
      admins: 'አስተዳዳሪዎች',
      viewDetails: 'ዝርዝር ይመልከቱ',
      restrictActions: 'ድርጊቶችን ገድብ',
      changeRole: 'ሚና ቀይር',
      deleteUser: 'ተጠቃሚ ሰርዝ',
      approveMaterial: 'ቁሳቁስ አጽድቅ',
      rejectMaterial: 'ቁሳቁስ ውድቅ አድርግ',
      deleteMaterial: 'ቁሳቁስ ሰርዝ',
      hidePost: 'ልጥፍ ደብቅ',
      unhidePost: 'ልጥፍ አሳይ',
      deletePost: 'ልጥፍ ሰርዝ',
      createNews: 'ዜና ፍጠር',
      editNews: 'ዜና አርትዕ',
      deleteNews: 'ዜና ሰርዝ',
      activityLog: 'የእንቅስቃሴ ምዝገባ',
      recentActivity: 'የቅርብ ጊዜ እንቅስቃሴ',
      adminMenu: 'የአስተዳዳሪ ምናሌ',
      overview: 'አጠቃላይ እይታ',
      pendingReview: 'በመጠባበቅ ላይ ያለ ግምገማ',
      usersManagement: 'የተጠቃሚዎች አስተዳደር',
      approvedContent: 'የጸደቀ ይዘት',
      featureRequests: 'የባህሪ ጥያቄዎች',
      syncData: 'ውሂብ አመሳስል',
      systemTools: 'የስርዓት አስተዳደር እና የአስተዳደር መሳሪያዎች',
      uploadFreshmanMaterial: 'የአዲስ ተማሪ ቁሳቁስ ስቀል',
      generalUpload: 'አጠቃላይ መስቀያ',
      queueEmpty: 'ወረፋ ባዶ ነው',
      noMaterialsReview: 'በዚህ ጊዜ ግምገማ የሚጠብቁ ቁሳቁሶች የሉም።',
      systemPulse: 'የስርዓት ምት',
      securityHealth: 'ደህንነት እና ጤና',
      activeStudents: 'ንቁ ተማሪዎች',
      totalResources: 'ጠቅላላ ግብዓቶች',
      queueSize: 'የወረፋ መጠን',
      uploadedBy: 'ያስቀመጠው',
      approve: 'አጽድቅ',
      reject: 'ውድቅ አድርግ',
      accessDenied: 'መዳረሻ ተከልክሏል',
      noPermissionAdmin: 'የአስተዳዳሪ ዳሽቦርድን ለመድረስ ፈቃድ የለዎትም።',
      loadingAdmin: 'የአስተዳዳሪ ዳሽቦርድ በመጫን ላይ...',
    },
    freshman: {
      title: 'የአዲስ ተማሪዎች ማዕከል',
      successHub: 'የአዲስ ተማሪዎች ስኬት ማዕከል',
      description: 'የመጀመሪያ ዓመትዎን ለማሸነፍ የሚያስፈልግዎት ሁሉ',
      students: '1,000+ ተማሪዎች',
      resources: '500+ ግብዓቶች',
      support: '24/7 ድጋፍ',
      searchPlaceholder: 'ኮርስዎን በስም ወይም በኮድ ይፈልጉ...',
      viewResources: 'ግብዓቶችን ይመልከቱ',
      hubEmpty: 'ማዕከል በአሁኑ ጊዜ ባዶ ነው',
      checkBackSoon: 'አስተዳዳሪዎቻችን ለመጀመሪያ ዓመትዎ ምርጥ ቁሳቁሶችን በማዘጋጀት ላይ ናቸው። ለአዲስ ግብዓቶች በቅርቡ ይመለሱ!',
      needSupport: 'የአካዳሚክ ድጋፍ ይፈልጋሉ?',
      mentorshipDesc: 'የእኛ የመምህርነት ፕሮግራም አዲስ ተማሪዎችን ከከፍተኛ አፈጻጸም ያላቸው ከፍተኛ ተማሪዎች ጋር ለ1-በ-1 መመሪያ ያገናኛል።',
      joinMentorship: 'መምህርነትን ይቀላቀሉ',
      year1Resources: 'የዓመት 1 ግብዓቶች',
      organizingResources: 'የአዲስ ተማሪዎች ግብዓቶችን በማደራጀት ላይ...',
      findCourse: 'ቁሳቁሶችን፣ ኮርሶችን ይፈልጉ…',
      accessResources: 'ለዚህ የመጀመሪያ ዓመት ኮርስ ግብዓቶችን እና ውይይቶችን ያግኙ።',
      uploadFreshmanMaterial: 'የአዲስ ተማሪ ቁሳቁስ ስቀል',
      year1ResourcesFor: 'ለአዲስ ተማሪዎች ማዕከል የዓመት 1 ግብዓቶች',
      materialsWillAppear: 'እዚህ የተሰቀሉ ቁሳቁሶች በአዲስ ተማሪዎች ኮርሶች ገጽ ላይ በኮርስ የተደራጁ ይታያሉ።',
      pdfFile: 'የPDF ፋይል',
      clickToChoose: 'PDF ለመምረጥ ጠቅ ያድርጉ',
      pdfOnly: 'PDFs ብቻ · ከፍተኛ 20MB',
      titleRequired: 'ርዕስ *',
      exampleTitle: 'ለምሳሌ የፕሮግራም መግቢያ - የትምህርት ማስታወሻዎች',
      descriptionLabel: 'መግለጫ',
      briefDescription: 'የቁሳቁስ ይዘት አጭር መግለጫ...',
      universityRequired: 'ዩኒቨርሲቲ *',
      selectUniversity: 'ዩኒቨርሲቲ ይምረጡ',
      courseRequired: 'ኮርስ *',
      exampleCourse: 'ለምሳሌ የፕሮግራም መግቢያ',
      freshmanHubUpload: 'የአዲስ ተማሪዎች ማዕከል መስቀያ',
      autoSetYear1: 'በራስ-ሰር ወደ ዓመት 1 ተቀምጧል',
      deptSetGeneral: 'ትምህርት ክፍል ወደ አጠቃላይ ተቀምጧል',
      willAppearInCourses: 'በአዲስ ተማሪዎች ኮርሶች ገጽ ላይ ይታያል',
      organizedByCourse: 'በኮርስ ኮድ የተደራጀ',
      uploading: 'በመስቀል ላይ…',
      uploadGeneralInstead: 'በምትኩ አጠቃላይ ቁሳቁስ ስቀል',
      uploadToHub: 'ወደ አዲስ ተማሪዎች ማዕከል ስቀል',
      adminAccessOnly: 'የአስተዳዳሪ መዳረሻ ብቻ',
      onlyAdminsCanUpload: 'አስተዳዳሪዎች ብቻ ቁሳቁሶችን ወደ አዲስ ተማሪዎች ማዕከል መስቀል ይችላሉ።',
      uploadGeneralMaterial: 'አጠቃላይ ቁሳቁስ ስቀል',
      goToDashboard: 'ወደ ዳሽቦርድ ሂድ',
      crushFirstYear: 'የመጀመሪያ ዓመትዎን ለማሸነፍ የሚያስፈልግዎት ሁሉ። ለአዲስ ተማሪዎች የተዘጋጁ ማስታወሻዎችን፣ ያለፉ ፈተናዎችን እና የጥናት ቁሳቁሶችን የተደራጀ መዳረሻ ያግኙ።',
      curatedForFreshmen: 'ለአዲስ ተማሪዎች የተዘጋጀ',
    },
    community: {
      leaderboard: 'የማህበረሰብ መሪዎች ሰሌዳ',
      topContributor: 'ከፍተኛ አስተዋፅዖ አበርካች',
      maintainStreak: 'ለከፍ ለማድረግ ተከታታይነትዎን ይጠብቁ!',
      searchMaterialsCourses: 'ቁሳቁሶችን፣ ኮርሶችን ይፈልጉ…',
    },

    placeholders: {
      searchUsers: 'ተጠቃሚዎችን ይፈልጉ...',
      typeMessage: 'መልእክትዎን ይተይቡ...',
      searchMaterials: 'ቁሳቁሶችን በርዕስ፣ ኮርስ ወይም ሰቃይ ይፈልጉ...',
      searchNews: 'ዜናዎችን፣ ስኮላርሺፖችን፣ ዝግጅቶችን ይፈልጉ...',
      searchDiscussions: 'ውይይቶችን ይፈልጉ...',
      selectCategory: 'ምድብ ይምረጡ',
      selectUniversity: 'ዩኒቨርሲቲ ይምረጡ',
      selectDepartment: 'ትምህርት ክፍል ይምረጡ',
      selectYear: 'ዓመት ይምረጡ',
      enterTitle: 'ርዕስ ያስገቡ',
      enterContent: 'ይዘት ያስገቡ',
      enterDescription: 'መግለጫ ያስገቡ',
      enterEmail: 'ኢሜል ያስገቡ',
      enterPassword: 'የይለፍ ቃል ያስገቡ',
      enterName: 'ስም ያስገቡ',
      addTags: 'መለያዎችን ያክሉ (Enter ይጫኑ)...',
      searchByAdmin: 'በአስተዳዳሪ ስም፣ የድርጊት ዝርዝሮች ወይም የግብአት መታወቂያ ይፈልጉ...',
      filterByAction: 'በድርጊት ያጣሩ',
      filterByResource: 'በግብአት ያጣሩ',
      filterByStatus: 'በሁኔታ ያጣሩ',
      filterByDepartment: 'በትምህርት ክፍል ያጣሩ',
      clickToUpload: 'ምስል ለመስቀል ጠቅ ያድርጉ',
      pasteImageUrl: 'ወይም የምስል URL ይለጥፉ',
      enterExternalLink: 'https://university.edu.et/announcement',
      typeTagPressEnter: 'መለያ ይተይቡ እና Enter ይጫኑ',
      shareThoughts: 'ሀሳብዎን ያጋሩ ወይም መፍትሄ ይስጡ...',
      describeQuestion: 'ጥያቄዎን ወይም ሀሳብዎን በዝርዝር ይግለጹ...',
      messageAIAssistant: 'የAI ረዳት መልእክት...',
    },

    chat: {
      selectUser: 'ውይይት ለመጀመር ተጠቃሚ ይምረጡ',
      startChatting: 'ውይይት ለመጀመር ከተጠቃሚዎች ዝርዝር አንድን ይምረጡ',
      chooseFromList: 'ውይይት ለመጀመር ከተጠቃሚዎች ዝርዝር አንድን ይምረጡ',
      noMessagesYet: 'ገና መልእክቶች የሉም። ውይይቱን ይጀምሩ!',
      startConversation: 'ገና መልእክቶች የሉም',
      chatUsers: 'የውይይት ተጠቃሚዎች',
      noUsersAvailable: 'ለውይይት ተጠቃሚዎች የሉም',
      noUsersMatch: 'ምንም ተጠቃሚዎች ከፍለጋዎ ጋር አይዛመዱም',
      online: 'በመስመር ላይ',
      offline: 'ከመስመር ውጭ',
      send: 'ላክ',
    },

    adminActivity: {
      title: 'የአስተዳዳሪ እንቅስቃሴ ምዝገባ',
      subtitle: 'ሁሉንም የአስተዳደር ድርጊቶች እና ለውጦች ይከታተሉ',
      activities: 'እንቅስቃሴዎች',
      searchPlaceholder: 'በአስተዳዳሪ ስም፣ የድርጊት ዝርዝሮች ወይም የግብአት መታወቂያ ይፈልጉ...',
      allActions: 'ሁሉም ድርጊቶች',
      create: 'ፍጠር',
      update: 'አዘምን',
      delete: 'ሰርዝ',
      grantPermission: 'ፈቃድ ስጥ',
      revokePermission: 'ፈቃድ ሰርዝ',
      allResources: 'ሁሉም ግብአቶች',
      users: 'ተጠቃሚዎች',
      materials: 'ቁሳቁሶች',
      messages: 'መልእክቶች',
      permissions: 'ፈቃዶች',
      noActivitiesFound: 'እንቅስቃሴዎች አልተገኙም',
      noActivitiesRecorded: 'ገና የአስተዳደር እንቅስቃሴዎች አልተመዘገቡም።',
      noActivitiesMatch: 'ምንም እንቅስቃሴዎች ከአሁኑ የፍለጋ መስፈርቶችዎ ጋር አይዛመዱም።',
      resourceId: 'የግብአት መታወቂያ',
    },

    materialsManagement: {
      searchPlaceholder: 'ቁሳቁሶችን በርዕስ፣ ኮርስ ወይም ሰቃይ ይፈልጉ...',
      allStatus: 'ሁሉም ሁኔታ',
      approved: 'ጸድቋል',
      pending: 'በመጠባበቅ ላይ',
      rejected: 'ተቀባይነት አላገኘም',
      flagged: 'ምልክት ተደርጎበታል',
      allDepartments: 'ሁሉም ትምህርት ክፍሎች',
      noMaterialsFound: 'ቁሳቁሶች አልተገኙም',
      noMaterialsUploaded: 'ገና ቁሳቁሶች ወደ ስርዓቱ አልተሰቀሉም።',
      noMaterialsMatch: 'ምንም ቁሳቁሶች ከአሁኑ የፍለጋ መስፈርቶችዎ ጋር አይዛመዱም።',
      topRated: 'ከፍተኛ ደረጃ',
      downloads: 'አውርዶች',
      materialDetails: 'የቁሳቁስ ዝርዝሮች',
      title: 'ርዕስ',
      course: 'ኮርስ',
      department: 'ትምህርት ክፍል',
      year: 'ዓመት',
      uploader: 'ሰቃይ',
      uploadDate: 'የመስቀያ ቀን',
      description: 'መግለጫ',
      stats: 'ስታቲስቲክስ',
      rating: 'ደረጃ',
      reviews: 'ግምገማዎች',
      fileSize: 'የፋይል መጠን',
      fileName: 'የፋይል ስም',
      fileType: 'የፋይል አይነት',
      contentModeration: 'የይዘት ቁጥጥር',
      approve: 'አጽድቅ',
      flag: 'ምልክት አድርግ',
      reject: 'አትቀበል',
      viewFile: 'ፋይል ይመልከቱ',
      download: 'አውርድ',
      analytics: 'ትንታኔዎች',
      deleteMaterial: 'ቁሳቁስ ሰርዝ',
      deleteConfirmation: 'ቁሳቁስ ሰርዝ',
      deleteWarning: 'ይህን ቁሳቁስ በቋሚነት መሰረዝ ይፈልጋሉ? ይህ ድርጊት መልሰው ማግኘት አይቻልም እና ሁሉንም ደረጃዎች፣ ግምገማዎች፣ የማውረድ ስታቲስቲክስ እና ተያያዥ ዕልባቶች ያስወግዳል።',
      deletePermanently: 'በቋሚነት ሰርዝ',
    },

    featureRequest: {
      title: 'የባህሪ ማሻሻያ ይጠይቁ',
      featureTitle: 'የባህሪ ርዕስ',
      description: 'መግለጫ',
      priority: 'ቅድሚያ',
      lowPriority: 'ዝቅተኛ ቅድሚያ',
      mediumPriority: 'መካከለኛ ቅድሚያ',
      highPriority: 'ከፍተኛ ቅድሚያ',
      material: 'ቁሳቁስ',
      reviewNote: 'ጥያቄዎ በአስተዳዳሪዎች ይገመገማል እና በወደፊት ማሻሻያዎች ሊተገበር ይችላል።',
      submitRequest: 'ጥያቄ አስገባ',
      submitting: 'በማስገባት ላይ...',
      titlePlaceholder: 'ለምሳሌ፣ የፍለጋ ተግባር ያክሉ',
      descriptionPlaceholder: 'በዚህ ቁሳቁስ ወይም መድረክ ላይ መታየት የሚፈልጉትን ባህሪ ይግለጹ...',
    },

    aiChat: {
      greeting: 'ሰላም! እኔ የEduNexus AI ረዳትዎ ነኝ። መድረኩን ለማሰስ፣ የጥናት ቁሳቁሶችን ለማግኘት፣ GPAን ለማስላት እና የሽልማት ስርዓታችንን ለመረዳት እርስዎን ለመርዳት እዚህ ነኝ። ዛሬ እንዴት ልርዳዎት እችላለሁ?',
      online: 'በመስመር ላይ',
      clickToExpand: 'ለማስፋት ጠቅ ያድርጉ',
      aiAssistant: 'የAI ረዳት',
      poweredBy: 'በEduNexus AI የተጎለበተ',
      pressEnter: 'ለመላክ Enter ይጫኑ',
    },

    newsPage: {
      createNews: 'የዜና ልጥፍ ፍጠር',
      editNews: 'የዜና ልጥፍ አርትዕ',
      backToNews: 'ወደ ዜና ተመለስ',
      shareUpdates: 'አስፈላጊ ዝመናዎችን ከተማሪዎች ጋር ያጋሩ',
      updateInfo: 'የዜና መረጃ አዘምን',
      titleRequired: 'ርዕስ ያስፈልጋል',
      summary: 'ማጠቃለያ',
      summaryPlaceholder: 'አጭር መግለጫ (በዜና ካርዶች ላይ ይታያል)',
      summaryHelper: 'አማራጭ: ለቅድመ እይታ ካርዶች አጭር ማጠቃለያ',
      categoryRequired: 'ምድብ ያስፈልጋል',
      universityRequired: 'ዩኒቨርሲቲ ያስፈልጋል',
      contentRequired: 'ይዘት ያስፈልጋል',
      fullContent: 'ይዘት',
      contentPlaceholder: 'ሙሉ የዜና ይዘት...',
      contentHelper: 'የዜና ማስታወቂያው ሙሉ ዝርዝሮች',
      coverImage: 'የሽፋን ምስል',
      clickToUploadImage: 'ምስል ለመስቀል ጠቅ ያድርጉ',
      imageFormat: 'PNG, JPG, GIF እስከ 5MB',
      chooseImage: 'ምስል ይምረጡ',
      orPasteUrl: 'ወይም የምስል URL ይለጥፉ',
      externalLink: 'ውጫዊ አገናኝ',
      externalLinkPlaceholder: 'https://university.edu.et/announcement',
      externalLinkHelper: 'አማራጭ: ወደ ኦፊሴላዊ ገጽ አገናኝ',
      deadline: 'የመጨረሻ ቀን',
      deadlineHelper: 'ለማመልከቻዎች/ምዝገባዎች',
      eventDate: 'የዝግጅት ቀን',
      eventDateHelper: 'ዝግጅቱ የሚካሄድበት ጊዜ',
      tags: 'መለያዎች',
      tagsHelper: 'ዜናዎን ለመመደብ መለያዎችን ያክሉ (ለምሳሌ፣ ስኮላርሺፕ፣ ድህረ ምረቃ፣ ምህንድስና)',
      add: 'አክል',
      featuredNews: 'ተለይቶ የቀረበ ዜና',
      featuredHelper: 'ይህን ዜና በተለይቶ የቀረበ ካሩሰል ውስጥ አሳይ',
      publishedNews: 'ታትሟል',
      publishedHelper: 'ይህን ዜና ለሁሉም ተጠቃሚዎች ይታይ',
      cancel: 'ሰርዝ',
      publishNews: 'ዜና አትም',
      publishing: 'በማተም ላይ...',
      uploadingImage: 'ምስል በመስቀል ላይ...',
      saveChanges: 'ለውጦችን አስቀምጥ',
      saving: 'በማስቀመጥ ላይ...',
      accessDenied: 'መዳረሻ ተከልክሏል',
      onlyAdmins: 'አስተዳዳሪዎች ብቻ የዜና ልጥፎችን መፍጠር ይችላሉ።',
      loadingNews: 'ዜና በመጫን ላይ...',
      titlePlaceholder: 'ለምሳሌ፣ አዲስ የስኮላርሺፕ እድል ለድህረ ምረቃ ተማሪዎች',
      tagAlreadyAdded: 'መለያ ቀድሞውኑ ታክሏል',
      maxTagsAllowed: 'ከፍተኛው 10 መለያዎች ይፈቀዳሉ',
      imageRequired: 'እባክዎ የምስል ፋይል ይምረጡ',
      imageSizeLimit: 'ምስል ከ5MB በታች መሆን አለበት',
    },

    newsFilters: {
      searchPlaceholder: 'ዜናዎችን፣ ስኮላርሺፖችን፣ ዝግጅቶችን ይፈልጉ...',
      allCategories: 'ሁሉም ምድቦች',
      admissions: '🎓 ተቀባይነት',
      scholarships: '💰 ስኮላርሺፖች',
      events: '📅 ዝግጅቶች',
      deadlines: '⏰ የመጨረሻ ቀኖች',
      announcements: '📢 ማስታወቂያዎች',
      allUniversities: 'ሁሉም ዩኒቨርሲቲዎች',
      clearFilters: 'ማጣሪያዎችን አጽዳ',
    },

    discussionDetail: {
      backToDiscussions: 'ወደ ውይይቶች ተመለስ',
      likes: 'ወደዶች',
      like: 'ወደድኩ',
      comments: 'አስተያየቶች',
      joinConversation: 'ውይይቱን ተቀላቀል',
      shareThoughtsPlaceholder: 'ሀሳብዎን ያጋሩ ወይም መፍትሄ ይስጡ...',
      postComment: 'አስተያየት ለጥፍ',
      posting: 'በመለጠፍ ላይ...',
      noCommentsYet: 'ገና አስተያየቶች የሉም። የመጀመሪያው ምላሽ ይስጡ!',
      beFirstToReply: 'የመጀመሪያው ምላሽ ይስጡ!',
      discussionNotFound: 'ውይይት አልተገኘም',
      loadingDiscussion: 'ውይይት በመጫን ላይ...',
      hidden: 'ተደብቋል',
      hiddenUntil: 'እስከ',
      unhidePost: 'ልጥፍ አሳይ',
      hidePost: 'ልጥፍ ደብቅ',
      deletePost: 'ልጥፍ ሰርዝ',
      deleteConfirmation: 'የውይይት ልጥፍ ሰርዝ',
      deleteWarning: 'ይህን ልጥፍ መሰረዝ ይፈልጋሉ? ይህ ድርጊት መልሰው ማግኘት አይቻልም። ሁሉም አስተያየቶች እና ወደዶች በቋሚነት ይሰረዛሉ።',
      hidePostTitle: 'የውይይት ልጥፍ ደብቅ',
      hidePostDescription: 'ይህን ልጥፍ ከመደበኛ ተጠቃሚዎች ደብቅ። ጊዜ ማዘጋጀት ወይም ያለጊዜ ገደብ መደበቅ ይችላሉ።',
      hideDuration: 'የመደበቂያ ጊዜ (ሰዓቶች)',
      hideDurationPlaceholder: 'ያለጊዜ ገደብ ለመደበቅ ባዶ ይተው',
      hideDurationHelper: 'ያለጊዜ ገደብ ለመደበቅ ባዶ ይተው። ሰዓቶችን ያስገቡ (ለምሳሌ፣ 24 ለ1 ቀን፣ 168 ለ1 ሳምንት)',
      hiding: 'በመደበቅ ላይ...',
      deleting: 'በመሰረዝ ላይ...',
    },

    postForm: {
      title: 'ርዕስ',
      titleHelper: 'ግልጽ እና ግልጽ ይሁኑ',
      titlePlaceholder: 'ለምሳሌ፣ ውስብስብ ሁኔታን በReact ውስጥ እንዴት ማስተናገድ እችላለሁ?',
      content: 'ይዘት',
      contentPlaceholder: 'ጥያቄዎን ወይም ሀሳብዎን በዝርዝር ይግለጹ...',
      tags: 'መለያዎች',
      tagsPlaceholder: 'መለያዎችን ያክሉ (Enter ይጫኑ)...',
      earnPoints: 'ለእያንዳንዱ አዲስ የውይይት ልጥፍ 5 ነጥቦችን ያግኙ!',
      cancel: 'ሰርዝ',
      createPost: 'ልጥፍ ፍጠር',
      posting: 'በመለጠፍ ላይ...',
    },

    adminSetup: {
      adminSetup: 'የአስተዳዳሪ ማዋቀሪያ',
      enterAdminKey: 'የአስተዳደር መብቶችን ለማግኘት የአስተዳዳሪ ቁልፍ ያስገቡ',
      adminKey: 'የአስተዳዳሪ ቁልፍ',
      adminKeyPlaceholder: 'የአስተዳዳሪ ቁልፍ ያስገቡ...',
      grantAccess: 'የአስተዳዳሪ መዳረሻ ስጥ',
      grantingAccess: 'መዳረሻ በመስጠት ላይ...',
      adminAccessGranted: 'የአስተዳዳሪ መዳረሻ ተሰጥቷል',
      youHaveAdmin: 'የአስተዳደር መብቶች አሉዎት። የአስተዳዳሪ ዳሽቦርድን ከአሰሳ ምናሌ ያግኙ።',
      goToAdminDashboard: 'ወደ አስተዳዳሪ ዳሽቦርድ ሂድ',
      forDemo: 'ለማሳያ:',
      adminKeyIs: 'የአስተዳዳሪ ቁልፍ',
    },
    buttons: {
      save: 'አስቀምጥ',
      cancel: 'ሰርዝ',
      delete: 'ሰርዝ',
      edit: 'አርትዕ',
      upload: 'ስቀል',
      download: 'አውርድ',
      share: 'አጋራ',
      bookmark: 'ምልክት አድርግ',
      unbookmark: 'ምልክት አስወግድ',
      like: 'አውደው',
      unlike: 'አውደው አስወግድ',
      comment: 'አስተያየት',
      reply: 'መልስ',
      report: 'ሪፖርት',
      approve: 'አጽድቅ',
      reject: 'ውድቅ አድርግ',
      hide: 'ደብቅ',
      unhide: 'አሳይ',
      viewMore: 'ተጨማሪ ይመልከቱ',
      loadMore: 'ተጨማሪ ጫን',
      refresh: 'አድስ',
      filter: 'አጣራ',
      sort: 'ደርድር',
      export: 'ላክ',
      import: 'አስገባ',
      print: 'አትም',
      copy: 'ቅዳ',
      paste: 'ለጥፍ',
      cut: 'ቁረጥ',
      undo: 'መልስ',
      redo: 'እንደገና አድርግ',
    },
    messages: {
      profileUpdated: 'መገለጫ በተሳካ ሁኔታ ተዘምኗል!',
      settingsSaved: 'ቅንብሮች በተሳካ ሁኔታ ተቀምጠዋል!',
      passwordChanged: 'የይለፍ ቃል በተሳካ ሁኔታ ተቀይሯል!',
      materialUploaded: 'ቁሳቁስ በተሳካ ሁኔታ ተስቅሏል!',
      materialDeleted: 'ቁሳቁስ በተሳካ ሁኔታ ተሰርዟል!',
      bookmarkAdded: 'ምልክት ታክሏል!',
      bookmarkRemoved: 'ምልክት ተወግዷል!',
      commentAdded: 'አስተያየት ታክሏል!',
      commentDeleted: 'አስተያየት ተሰርዟል!',
      postCreated: 'ልጥፍ በተሳካ ሁኔታ ተፈጥሯል!',
      postDeleted: 'ልጥፍ በተሳካ ሁኔታ ተሰርዟል!',
      errorOccurred: 'ስህተት ተከስቷል',
      tryAgain: 'እባክዎ እንደገና ይሞክሩ',
      confirmDelete: 'መሰረዝን አረጋግጥ',
      cannotUndo: 'ይህ ድርጊት መልሰው ማድረግ አይችሉም',
      areYouSure: 'እርግጠኛ ነዎት?',
      loginRequired: 'መግባት ያስፈልጋል',
      pleaseLogin: 'ለመቀጠል እባክዎ ይግቡ',
      accessDenied: 'መዳረሻ ተከልክሏል',
      noPermission: 'ፈቃድ የለዎትም',
      networkError: 'የኔትወርክ ስህተት',
      checkConnection: 'እባክዎ ግንኙነትዎን ያረጋግጡ',
    },
    footer: {
      product: 'ምርት',
      account: 'መለያ',
      features: 'ባህሪያት',
      aboutUs: 'ስለ እኛ',
      contactUs: 'ያግኙን',
      privacyPolicy: 'የግላዊነት ፖሊሲ',
      termsOfService: 'የአገልግሎት ውሎች',
      helpCenter: 'የእገዛ ማዕከል',
      builtFor: 'ለኢትዮጵያ ተማሪዎች የተሰራ',
      allRightsReserved: 'መብቱ በህግ የተጠበቀ ነው',
      professionalPlatform: 'ሙያዊ የተማሪዎች የትብብር መድረክ',
      modernPlace: 'ዘመናዊ እና ሙያዊ ቦታ የኢትዮጵያ ተማሪዎች እንዲማሩ፣ ቁሳቁሶችን እንዲያጋሩ እና ከእኩዮች እና AI እገዛ እንዲያገኙ።',
      joinNow: 'አሁን ይቀላቀሉ',
      getFullAccess: 'ወደ ቁሳቁሶች፣ ውይይት እና AI ድጋፍ ሙሉ መዳረሻ ያግኙ።',
      createFreeAccount: 'ነጻ መለያ ይፍጠሩ',
    },
  },
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  om: 'Afaan Oromoo',
  am: 'አማርኛ (Amharic)',
};
