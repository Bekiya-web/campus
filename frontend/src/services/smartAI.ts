// Strictly EduNexus AI Assistant
// Only answers questions about the platform, its features, and materials.

export class SmartAI {
  // GPA calculation logic (Core Feature)
  static evaluateGPA(grades: string[]): { gpa: number; totalPoints: number; count: number } | null {
    const gradePoints: { [key: string]: number } = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    };

    let totalPoints = 0;
    let validGrades = 0;

    for (const grade of grades) {
      const upperGrade = grade.toUpperCase().trim();
      if (gradePoints.hasOwnProperty(upperGrade)) {
        totalPoints += gradePoints[upperGrade];
        validGrades++;
      }
    }

    if (validGrades === 0) return null;
    return { gpa: totalPoints / validGrades, totalPoints, count: validGrades };
  }

  // Smart question understanding - Limited to Project Context
  static parseQuestion(question: string): { intent: string; entities: any } {
    const q = question.toLowerCase().trim();
    
    if (q.includes('gpa') || q.includes('grade') || q.includes('cgpa')) {
      const grades = q.match(/[abcdf][+-]?/gi) || [];
      return { intent: 'gpa', entities: { grades } };
    }
    
    if (q.includes('upload') || q.includes('share') || q.includes('post')) {
      return { intent: 'platform_upload', entities: {} };
    }

    if (q.includes('download') || q.includes('find') || q.includes('material') || q.includes('search')) {
      return { intent: 'platform_materials', entities: {} };
    }

    if (q.includes('message') || q.includes('chat') || q.includes('talk') || q.includes('contact')) {
      return { intent: 'platform_social', entities: {} };
    }

    if (q.includes('point') || q.includes('badge') || q.includes('level') || q.includes('rank')) {
      return { intent: 'platform_rewards', entities: {} };
    }

    if (q.includes('admin') || q.includes('manage') || q.includes('approve')) {
      return { intent: 'platform_admin', entities: {} };
    }
    
    return { intent: 'general', entities: {} };
  }

  // Generate responses strictly about the project
  static generateResponse(question: string): { text: string; type: "theory" | "general" } {
    const parsed = this.parseQuestion(question);
    
    switch (parsed.intent) {
      case 'gpa':
        return this.handleGPA(parsed.entities);
      case 'platform_upload':
        return this.handleUpload();
      case 'platform_materials':
        return this.handleMaterials();
      case 'platform_social':
        return this.handleSocial();
      case 'platform_rewards':
        return this.handleRewards();
      case 'platform_admin':
        return this.handleAdmin();
      default:
        return this.handleGeneral();
    }
  }

  static handleGPA(entities: any): { text: string; type: "theory" } {
    if (entities.grades && entities.grades.length > 0) {
      const res = this.evaluateGPA(entities.grades);
      if (res) {
        return {
          text: `**GPA Calculation (EduNexus):**\n\nYour GPA: **${res.gpa.toFixed(2)}**\n\n**Breakdown:**\n• Grades detected: ${entities.grades.join(', ')}\n• Total Grade Points: ${res.totalPoints.toFixed(1)}\n• Courses: ${res.count}\n\nYou can also use our dedicated **GPA Management** page for more detailed calculations including credit hours.`,
          type: "theory"
        };
      }
    }
    return {
      text: `**GPA Calculator Guide:**\n\nYou can calculate your GPA by providing your grades (e.g., "Calculate my GPA for A, B+, A-").\n\nIn EduNexus, we use the standard 4.0 scale:\n• A/A+ = 4.0\n• B = 3.0\n• C = 2.0\n• D = 1.0\n• F = 0.0\n\nVisit the **GPA Management** page to save your semester results!`,
      type: "theory"
    };
  }

  static handleUpload(): { text: string; type: "general" } {
    return {
      text: `**How to Upload on EduNexus:**\n\n1. Go to the **Upload** page from the navigation bar.\n2. Select your **PDF** file.\n3. Enter the Title, Course, University, and Department.\n4. Click **Upload Material**.\n\n*Note: Your material will be set to "Pending" until an administrator approves it for public viewing. You earn 10 points for every approved upload!*`,
      type: "general"
    };
  }

  static handleMaterials(): { text: string; type: "general" } {
    return {
      text: `**Finding Study Materials:**\n\nYou can find notes, exams, and books on the **Materials** page. Use the filters to narrow down by:\n• University\n• Department\n• Year Level\n• Course Name\n\nYou can also bookmark materials to save them to your profile for later!`,
      type: "general"
    };
  }

  static handleSocial(): { text: string; type: "general" } {
    return {
      text: `**Messaging & Chat:**\n\n• **Direct Messages:** You can contact any uploader directly from the material detail page to ask questions.\n• **Global Chat:** Join the community discussion in the **Chat** section to talk with other students in real-time.`,
      type: "general"
    };
  }

  static handleRewards(): { text: string; type: "general" } {
    return {
      text: `**EduNexus Rewards System:**\n\nEarn points and level up by contributing to the community:\n• **Upload Material:** +10 points (upon approval)\n• **Get Bookmarked:** Earn points when others save your work\n• **Badges:** Unlock achievements like "First Upload" or "Expert Scholar" as you reach milestones.\n\nCheck your progress on your **Profile** page!`,
      type: "general"
    };
  }

  static handleAdmin(): { text: string; type: "general" } {
    return {
      text: `**Admin Controls:**\n\nAdministrators use the **Admin Dashboard** to:\n• Review and Approve/Reject pending materials.\n• Manage User roles and permissions.\n• Monitor system statistics.\n• Handle feature requests.\n\nIf you have uploaded a material, it will appear in your profile as "Pending" until an admin reviews it.`,
      type: "general"
    };
  }

  static handleGeneral(): { text: string; type: "general" } {
    return {
      text: `**Welcome to EduNexus Assistant!** 🤖\n\nI am strictly designed to help you navigate and use the **EduNexus** platform. I only answer questions related to the project's features:\n\n• **Materials:** How to find, download, or bookmark notes.\n• **Uploads:** How to share your work and the approval process.\n• **GPA Calculator:** Help with calculating your grades.\n• **Social:** How the chat and messaging systems work.\n• **Rewards:** Information on points, levels, and badges.\n\n**What can I help you with regarding EduNexus today?**`,
      type: "general"
    };
  }
}

export function buildReply(question: string): { text: string; type: "theory" | "general" } {
  return SmartAI.generateResponse(question);
}