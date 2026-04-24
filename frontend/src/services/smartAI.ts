// Advanced AI Engine with better understanding
export class SmartAI {
  // Enhanced calculation engine
  static evaluateExpression(expr: string): number | string {
    try {
      // Handle percentage calculations
      if (expr.includes('%')) {
        const percentMatch = expr.match(/(\d+(?:\.\d+)?)\s*%\s*of\s*(\d+(?:\.\d+)?)/i);
        if (percentMatch) {
          const percent = parseFloat(percentMatch[1]);
          const number = parseFloat(percentMatch[2]);
          return (percent / 100) * number;
        }
      }

      // Handle square root
      if (expr.includes('sqrt')) {
        const sqrtMatch = expr.match(/sqrt\((\d+(?:\.\d+)?)\)/);
        if (sqrtMatch) {
          return Math.sqrt(parseFloat(sqrtMatch[1]));
        }
      }

      // Handle power operations
      expr = expr.replace(/(\d+(?:\.\d+)?)\s*\^\s*(\d+(?:\.\d+)?)/g, 'Math.pow($1, $2)');
      
      // Clean and evaluate
      const cleanExpr = expr.replace(/[^0-9+\-*/().\s]/g, '');
      if (!/^[0-9+\-*/().\s]+$/.test(cleanExpr)) {
        return "Invalid expression";
      }
      
      const result = Function(`"use strict"; return (${cleanExpr})`)();
      
      if (typeof result === 'number' && !isNaN(result)) {
        return Math.round(result * 1000000) / 1000000;
      }
      
      return "Invalid calculation";
    } catch (error) {
      return "Error in calculation";
    }
  }

  // Smart question understanding
  static parseQuestion(question: string): { intent: string; entities: any; confidence: number } {
    const q = question.toLowerCase().trim();
    
    // Mathematical calculations
    if (this.isCalculationQuestion(q)) {
      return { intent: 'calculation', entities: this.extractMathEntities(q), confidence: 0.9 };
    }
    
    // GPA related
    if (this.isGPAQuestion(q)) {
      return { intent: 'gpa', entities: this.extractGPAEntities(q), confidence: 0.9 };
    }
    
    // Algorithm/CS theory
    if (this.isAlgorithmQuestion(q)) {
      return { intent: 'algorithm', entities: this.extractAlgorithmEntities(q), confidence: 0.8 };
    }
    
    // Study help
    if (this.isStudyQuestion(q)) {
      return { intent: 'study', entities: this.extractStudyEntities(q), confidence: 0.7 };
    }
    
    // Platform help
    if (this.isPlatformQuestion(q)) {
      return { intent: 'platform', entities: this.extractPlatformEntities(q), confidence: 0.8 };
    }
    
    return { intent: 'general', entities: {}, confidence: 0.5 };
  }

  static isCalculationQuestion(q: string): boolean {
    const calcKeywords = ['calculate', 'compute', 'solve', 'what is', 'find', 'result of'];
    const mathSymbols = /[\d+\-*/()%^]/;
    return calcKeywords.some(kw => q.includes(kw)) || mathSymbols.test(q);
  }

  static isGPAQuestion(q: string): boolean {
    return q.includes('gpa') || q.includes('grade') || q.includes('cgpa') || 
           (q.includes('calculate') && (q.includes('grade') || /[abcdf]/i.test(q)));
  }

  static isAlgorithmQuestion(q: string): boolean {
    const algoKeywords = ['algorithm', 'big o', 'complexity', 'sort', 'search', 'data structure', 
                         'dynamic programming', 'recursion', 'tree', 'graph', 'hash'];
    return algoKeywords.some(kw => q.includes(kw));
  }

  static isStudyQuestion(q: string): boolean {
    const studyKeywords = ['study', 'learn', 'exam', 'test', 'prepare', 'tips', 'help', 'how to'];
    return studyKeywords.some(kw => q.includes(kw));
  }

  static isPlatformQuestion(q: string): boolean {
    const platformKeywords = ['upload', 'download', 'material', 'platform', 'website', 'how do i', 'where'];
    return platformKeywords.some(kw => q.includes(kw));
  }

  static extractMathEntities(q: string): any {
    const numbers = q.match(/\d+(?:\.\d+)?/g);
    const operations = q.match(/[+\-*/^%]/g);
    const hasPercentage = q.includes('%');
    const hasSquareRoot = q.includes('sqrt');
    
    return { numbers, operations, hasPercentage, hasSquareRoot };
  }

  static extractGPAEntities(q: string): any {
    const grades = q.match(/[abcdf][+-]?/gi);
    const numbers = q.match(/\d+(?:\.\d+)?/g);
    const creditHours = q.includes('credit') || q.includes('hour');
    
    return { grades, numbers, creditHours };
  }

  static extractAlgorithmEntities(q: string): any {
    const algorithms = ['bubble', 'merge', 'quick', 'heap', 'insertion', 'selection'];
    const dataStructures = ['array', 'list', 'tree', 'graph', 'hash', 'stack', 'queue'];
    const concepts = ['big o', 'complexity', 'recursion', 'dynamic programming'];
    
    const foundAlgorithms = algorithms.filter(alg => q.includes(alg));
    const foundStructures = dataStructures.filter(ds => q.includes(ds));
    const foundConcepts = concepts.filter(concept => q.includes(concept));
    
    return { algorithms: foundAlgorithms, dataStructures: foundStructures, concepts: foundConcepts };
  }

  static extractStudyEntities(q: string): any {
    const subjects = ['math', 'algorithm', 'programming', 'computer science', 'calculus', 'algebra'];
    const studyMethods = ['memorize', 'understand', 'practice', 'review'];
    
    const foundSubjects = subjects.filter(subj => q.includes(subj));
    const foundMethods = studyMethods.filter(method => q.includes(method));
    
    return { subjects: foundSubjects, methods: foundMethods };
  }

  static extractPlatformEntities(q: string): any {
    const actions = ['upload', 'download', 'search', 'find', 'share'];
    const features = ['material', 'gpa calculator', 'chat', 'message'];
    
    const foundActions = actions.filter(action => q.includes(action));
    const foundFeatures = features.filter(feature => q.includes(feature));
    
    return { actions: foundActions, features: foundFeatures };
  }

  // Generate intelligent responses
  static generateResponse(question: string): { text: string; type: "calculation" | "theory" | "general" } {
    const parsed = this.parseQuestion(question);
    
    switch (parsed.intent) {
      case 'calculation':
        return this.handleCalculation(question, parsed.entities);
      case 'gpa':
        return this.handleGPA(question, parsed.entities);
      case 'algorithm':
        return this.handleAlgorithm(question, parsed.entities);
      case 'study':
        return this.handleStudy(question, parsed.entities);
      case 'platform':
        return this.handlePlatform(question, parsed.entities);
      default:
        return this.handleGeneral(question);
    }
  }

  static handleCalculation(question: string, entities: any): { text: string; type: "calculation" } {
    const q = question.toLowerCase();
    
    // Percentage calculations
    if (entities.hasPercentage || q.includes('percent')) {
      const percentMatch = q.match(/(\d+(?:\.\d+)?)\s*%?\s*of\s*(\d+(?:\.\d+)?)/);
      if (percentMatch) {
        const percent = parseFloat(percentMatch[1]);
        const number = parseFloat(percentMatch[2]);
        const result = (percent / 100) * number;
        
        return {
          text: `**Percentage Calculation:**\n\n${percent}% of ${number} = ${result}\n\n**Step-by-step:**\n1. Convert percentage to decimal: ${percent}% = ${percent/100}\n2. Multiply: ${percent/100} × ${number} = ${result}\n\n**Formula:** Percentage of Number = (Percentage ÷ 100) × Number`,
          type: "calculation"
        };
      }
    }
    
    // Quadratic equations
    if (q.includes('quadratic') || (q.includes('solve') && q.includes('x'))) {
      return {
        text: `**Quadratic Equation Solver:**\n\nFor equations in the form ax² + bx + c = 0\n\n**Formula:** x = (-b ± √(b²-4ac)) / 2a\n\n**Example:** x² - 5x + 6 = 0\n• a = 1, b = -5, c = 6\n• Discriminant = (-5)² - 4(1)(6) = 25 - 24 = 1\n• x = (5 ± √1) / 2 = (5 ± 1) / 2\n• Solutions: x = 3 or x = 2\n\nProvide your specific equation for a detailed solution!`,
        type: "calculation"
      };
    }
    
    // Basic arithmetic
    if (entities.numbers && entities.operations) {
      const expr = question.replace(/[^0-9+\-*/().\s]/g, '');
      const result = this.evaluateExpression(expr);
      
      return {
        text: `**Calculation Result:**\n\n${expr} = ${result}\n\n**Order of Operations (PEMDAS):**\n1. **P**arentheses first\n2. **E**xponents (powers)\n3. **M**ultiplication and **D**ivision (left to right)\n4. **A**ddition and **S**ubtraction (left to right)\n\nNeed help with more complex calculations?`,
        type: "calculation"
      };
    }
    
    return {
      text: `**Advanced Calculator Ready!**\n\nI can help with:\n\n🧮 **Basic Math:** 15 + 25, 8 × 7, 100 ÷ 4\n📊 **Percentages:** 25% of 80, what percent is 15 of 60\n📈 **Algebra:** Solve x² - 5x + 6 = 0\n📉 **Functions:** √16, 2³, log calculations\n\n**Just ask naturally:**\n• "What is 25% of 200?"\n• "Calculate 15 × 8 + 7"\n• "Solve x squared minus 4x plus 3 equals 0"\n\nWhat calculation do you need?`,
      type: "calculation"
    };
  }

  static handleGPA(question: string, entities: any): { text: string; type: "calculation" } {
    if (entities.grades && entities.grades.length > 0) {
      const gradePoints: { [key: string]: number } = {
        'A+': 4.0, 'A': 4.0, 'A-': 3.7,
        'B+': 3.3, 'B': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C': 2.0, 'C-': 1.7,
        'D+': 1.3, 'D': 1.0, 'F': 0.0
      };

      let totalPoints = 0;
      let validGrades = 0;

      for (const grade of entities.grades) {
        const upperGrade = grade.toUpperCase().trim();
        if (gradePoints.hasOwnProperty(upperGrade)) {
          totalPoints += gradePoints[upperGrade];
          validGrades++;
        }
      }

      if (validGrades > 0) {
        const gpa = totalPoints / validGrades;
        return {
          text: `**GPA Calculation Result:**\n\n**Your GPA: ${gpa.toFixed(2)}**\n\n**Breakdown:**\n• Grades: ${entities.grades.join(', ')}\n• Total Grade Points: ${totalPoints.toFixed(1)}\n• Number of Courses: ${validGrades}\n• GPA = ${totalPoints.toFixed(1)} ÷ ${validGrades} = ${gpa.toFixed(2)}\n\n**Grade Scale:**\n• A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0\n• Plus (+) adds ~0.3, Minus (-) subtracts ~0.3\n\nNeed help calculating with credit hours?`,
          type: "calculation"
        };
      }
    }
    
    return {
      text: `**GPA Calculator Guide:**\n\n**How to Calculate GPA:**\n1. Convert each grade to grade points\n2. Add all grade points\n3. Divide by number of courses\n\n**Grade Scale:**\n• A = 4.0 points\n• B = 3.0 points  \n• C = 2.0 points\n• D = 1.0 points\n• F = 0.0 points\n\n**Example:**\n"Calculate GPA with grades A, B, B, A"\n= (4.0 + 3.0 + 3.0 + 4.0) ÷ 4 = 3.5 GPA\n\n**With Credit Hours:**\nGPA = Σ(Grade Points × Credit Hours) ÷ Σ(Credit Hours)\n\nTry: "Calculate my GPA with grades A, B, C, A"`,
      type: "calculation"
    };
  }

  static handleAlgorithm(question: string, entities: any): { text: string; type: "theory" } {
    const q = question.toLowerCase();
    
    if (q.includes('big o') || q.includes('complexity')) {
      return {
        text: `**Big O Notation Explained:**\n\n**What is Big O?**\nBig O describes how algorithm performance scales with input size.\n\n**Common Complexities (Best → Worst):**\n• **O(1)** - Constant: Array access, hash lookup\n• **O(log n)** - Logarithmic: Binary search\n• **O(n)** - Linear: Simple loop, array scan\n• **O(n log n)** - Linearithmic: Merge sort, heap sort\n• **O(n²)** - Quadratic: Nested loops, bubble sort\n• **O(2ⁿ)** - Exponential: Recursive fibonacci\n• **O(n!)** - Factorial: Traveling salesman brute force\n\n**Real Examples:**\n• Finding max in array: O(n)\n• Binary search in sorted array: O(log n)\n• Sorting with merge sort: O(n log n)\n\n**Why It Matters:**\nHelps choose the right algorithm for your data size!`,
        type: "theory"
      };
    }
    
    if (entities.algorithms.length > 0 || q.includes('sort')) {
      return {
        text: `**Sorting Algorithms Explained:**\n\n**Popular Sorting Algorithms:**\n\n**1. Bubble Sort - O(n²)**\n• Compares adjacent elements\n• Swaps if in wrong order\n• Simple but slow for large data\n\n**2. Merge Sort - O(n log n)**\n• Divide array in half recursively\n• Merge sorted halves\n• Stable and predictable\n\n**3. Quick Sort - O(n log n) average**\n• Choose pivot element\n• Partition around pivot\n• Fastest in practice\n\n**4. Heap Sort - O(n log n)**\n• Build max heap\n• Extract maximum repeatedly\n• In-place sorting\n\n**When to Use:**\n• Small arrays (< 50): Insertion sort\n• General purpose: Quick sort\n• Guaranteed O(n log n): Merge sort\n• Memory constrained: Heap sort`,
        type: "theory"
      };
    }
    
    return {
      text: `**Computer Science Concepts:**\n\n**Algorithm Analysis:**\n• Time complexity (Big O notation)\n• Space complexity\n• Best, average, worst cases\n\n**Data Structures:**\n• Arrays, Linked Lists\n• Stacks, Queues\n• Trees, Graphs\n• Hash Tables\n\n**Algorithm Types:**\n• Sorting & Searching\n• Dynamic Programming\n• Greedy Algorithms\n• Graph Algorithms\n\n**Ask me about:**\n• "Explain bubble sort"\n• "What is Big O notation?"\n• "How does binary search work?"\n• "Dynamic programming examples"\n\nWhat specific topic interests you?`,
      type: "theory"
    };
  }

  static handleStudy(question: string, entities: any): { text: string; type: "general" } {
    const q = question.toLowerCase();
    
    if (q.includes('exam') || q.includes('test')) {
      return {
        text: `**Exam Preparation Strategy:**\n\n**📚 Before the Exam (1-2 weeks):**\n• Create study schedule\n• Gather all materials and notes\n• Identify weak topics\n• Make summary sheets\n\n**🎯 Active Study Techniques:**\n• **Practice Problems:** Solve similar questions\n• **Teach Someone:** Explain concepts aloud\n• **Flashcards:** For formulas and definitions\n• **Mock Tests:** Time yourself\n\n**⏰ Final Week:**\n• Review summary sheets daily\n• Focus on weak areas\n• Get enough sleep\n• Stay hydrated and eat well\n\n**📝 During the Exam:**\n• Read all questions first\n• Start with easy questions\n• Manage your time\n• Check your answers\n\n**For Math/CS Exams:**\n• Memorize key formulas\n• Practice step-by-step solutions\n• Understand concepts, don't just memorize`,
        type: "general"
      };
    }
    
    return {
      text: `**Effective Study Strategies:**\n\n**🧠 Learning Techniques:**\n• **Active Recall:** Test yourself without notes\n• **Spaced Repetition:** Review at increasing intervals\n• **Feynman Technique:** Explain in simple terms\n• **Interleaving:** Mix different topics\n\n**⏰ Time Management:**\n• **Pomodoro:** 25min study + 5min break\n• **Time Blocking:** Dedicated study slots\n• **Priority Matrix:** Important vs Urgent\n\n**📚 For Technical Subjects:**\n• Understand concepts before memorizing\n• Practice problems daily\n• Create concept maps\n• Work through examples step-by-step\n\n**💡 Memory Tips:**\n• Use mnemonics for formulas\n• Create visual associations\n• Teach others to reinforce learning\n• Regular review prevents forgetting\n\nWhat specific subject are you studying?`,
      type: "general"
    };
  }

  static handlePlatform(question: string, entities: any): { text: string; type: "general" } {
    const q = question.toLowerCase();
    
    if (q.includes('upload')) {
      return {
        text: `**How to Upload Materials:**\n\n**📤 Step-by-Step Upload:**\n1. Click **"Upload"** in the navigation menu\n2. Fill in the material details:\n   • Title (descriptive name)\n   • Course name\n   • Select your university\n   • Choose department\n   • Select year level\n3. Upload your file (PDF, DOC, images)\n4. Add description (optional but helpful)\n5. Click **"Submit"**\n\n**📋 Best Practices:**\n• Use clear, descriptive titles\n• Include course code if applicable\n• Add helpful descriptions\n• Ensure files are readable\n• Check for completeness\n\n**🏆 Benefits:**\n• Earn points for each upload\n• Help fellow students\n• Build your reputation\n• Unlock badges\n\n**📁 Supported Formats:**\n• PDF documents\n• Word documents (.doc, .docx)\n• Images (JPG, PNG)\n• PowerPoint presentations`,
        type: "general"
      };
    }
    
    return {
      text: `**EduNexus Platform Guide:**\n\n**🎯 Main Features:**\n• **Materials:** Browse and download study resources\n• **Upload:** Share your notes and materials\n• **GPA Calculator:** Calculate your grades\n• **Chat:** Connect with other students\n• **Messages:** Direct communication\n\n**🔍 Finding Materials:**\n• Use search filters (university, department, year)\n• Browse by course or subject\n• Check ratings and reviews\n• Bookmark useful materials\n\n**💬 Communication:**\n• Message material uploaders\n• Join general chat discussions\n• Request specific materials\n• Ask questions and get help\n\n**🏆 Gamification:**\n• Earn points for contributions\n• Unlock achievement badges\n• Build your profile reputation\n• Help the student community\n\nWhat specific feature would you like to learn about?`,
      type: "general"
    };
  }

  static handleGeneral(question: string): { text: string; type: "general" } {
    return {
      text: `**I'm here to help! 🤖**\n\nI understand and can help with:\n\n🧮 **Mathematics:**\n• Calculations: "What is 25% of 80?"\n• Algebra: "Solve x² - 4x + 3 = 0"\n• GPA: "Calculate GPA with grades A, B, C"\n\n📚 **Computer Science:**\n• Algorithms: "Explain merge sort"\n• Complexity: "What is Big O notation?"\n• Data structures: "How do hash tables work?"\n\n📖 **Study Help:**\n• Exam prep: "How to prepare for exams?"\n• Study techniques: "Best ways to memorize formulas"\n• Time management: "How to organize study time?"\n\n💻 **Platform Help:**\n• Usage: "How do I upload materials?"\n• Features: "How does the chat work?"\n• Navigation: "Where can I find my GPA calculator?"\n\n**Just ask naturally! I'll understand and provide detailed, helpful answers.**\n\nWhat would you like to know?`,
      type: "general"
    };
  }
}

export function buildReply(question: string): { text: string; type: "calculation" | "theory" | "general" } {
  return SmartAI.generateResponse(question);
}