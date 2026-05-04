import { supabase } from "@/integrations/supabase/client";

export async function createTestUser() {
  try {
    const testUser = {
      uid: `test-user-${Date.now()}`,
      name: `Test User ${Math.floor(Math.random() * 1000)}`,
      email: `testuser${Math.floor(Math.random() * 1000)}@example.com`,
      university: 'test-university',
      universityName: 'Test University',
      department: 'Computer Science',
      year: '3rd Year',
      role: 'student' as const,
      points: Math.floor(Math.random() * 100),
      badges: [],
      bookmarks: [],
      createdAt: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('users')
      .insert([testUser])
      .select()
      .single();

    if (error) {
      console.error('Error creating test user:', error);
      return null;
    }

    console.log('✅ Created test user:', data);
    return data;
  } catch (error) {
    console.error('Failed to create test user:', error);
    return null;
  }
}

export async function createTestMaterial(uploaderId: string) {
  try {
    const testMaterial = {
      id: `test-material-${Date.now()}`,
      title: `Test Material ${Math.floor(Math.random() * 1000)}`,
      description: 'This is a test material for debugging purposes',
      course: 'CS101',
      department: 'Computer Science',
      year: '3rd Year',
      university: 'test-university',
      universityName: 'Test University',
      uploaderId: uploaderId,
      fileUrl: 'https://example.com/test.pdf',
      fileName: 'test.pdf',
      fileSize: 1024,
      fileType: 'application/pdf',
      downloadCount: Math.floor(Math.random() * 50),
      ratingAvg: Math.random() * 5,
      ratingCount: Math.floor(Math.random() * 10),
      createdAt: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('materials')
      .insert([testMaterial])
      .select()
      .single();

    if (error) {
      console.error('Error creating test material:', error);
      return null;
    }

    console.log('✅ Created test material:', data);
    return data;
  } catch (error) {
    console.error('Failed to create test material:', error);
    return null;
  }
}

export async function createTestData() {
  console.log('🧪 Creating test data...');
  
  // Create a test user first
  const testUser = await createTestUser();
  if (!testUser) {
    console.error('❌ Failed to create test user');
    return false;
  }

  // Create a test material
  const testMaterial = await createTestMaterial(testUser.uid);
  if (!testMaterial) {
    console.error('❌ Failed to create test material');
    return false;
  }

  console.log('✅ Test data created successfully!');
  return true;
}

export async function checkDatabaseTables() {
  console.log('🔍 Checking database tables...');
  
  try {
    // Check users table structure
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(3);
    
    console.log('👥 Users table:', { 
      exists: !usersError, 
      error: usersError?.message, 
      hasData: (usersData?.length || 0) > 0,
      sampleData: usersData
    });

    // Check materials table structure
    const { data: materialsData, error: materialsError } = await supabase
      .from('materials')
      .select('*')
      .limit(3);
    
    console.log('📚 Materials table:', { 
      exists: !materialsError, 
      error: materialsError?.message, 
      hasData: (materialsData?.length || 0) > 0,
      sampleData: materialsData
    });

    // Try to get table info if possible
    let tableInfo = null;
    let tableError = null;
    
    try {
      const result = await supabase.rpc('get_table_info', { table_name: 'users' });
      tableInfo = result.data;
      tableError = result.error;
    } catch (err) {
      tableError = { message: 'RPC not available' };
    }
    
    console.log('🔧 Table info:', { tableInfo, tableError });

    return {
      usersTable: { 
        exists: !usersError, 
        hasData: (usersData?.length || 0) > 0,
        count: usersData?.length || 0,
        sample: usersData?.[0] || null,
        error: usersError?.message
      },
      materialsTable: { 
        exists: !materialsError, 
        hasData: (materialsData?.length || 0) > 0,
        count: materialsData?.length || 0,
        sample: materialsData?.[0] || null,
        error: materialsError?.message
      }
    };
  } catch (error) {
    console.error('❌ Error checking database tables:', error);
    return null;
  }
}