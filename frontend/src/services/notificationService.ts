import { supabase } from "@/integrations/supabase/client";

export interface NotificationDoc {
  id: string;
  type: string;
  title: string;
  body: string;
  materialId?: string;
  university?: string;
  department?: string;
  course?: string;
  uid: string;
  read: boolean;
  createdAt: string;
}

/** Notify all users in the same university+department (excluding uploader) */
export async function createNotification(params: {
  type: string;
  university: string;
  department: string;
  course: string;
  materialId: string;
  title: string;
  body: string;
  excludeUid: string;
}) {
  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("uid")
    .eq("university", params.university)
    .eq("department", params.department);
  if (usersError) throw usersError;

  const payload = (users ?? [])
    .filter((u) => u.uid !== params.excludeUid)
    .map((u) => ({
      type: params.type,
      title: params.title,
      body: params.body,
      materialId: params.materialId,
      university: params.university,
      department: params.department,
      course: params.course,
      uid: u.uid as string,
      read: false,
      createdAt: new Date().toISOString(),
    }));
  if (!payload.length) return;
  const { error: insertError } = await supabase.from("notifications").insert(payload);
  if (insertError) throw insertError;
}

/** Send a single direct notification to one specific user */
export async function createDirectNotification(params: {
  uid: string;
  type: string;
  title: string;
  body: string;
  materialId?: string;
}) {
  const { error } = await supabase.from("notifications").insert({
    uid: params.uid,
    type: params.type,
    title: params.title,
    body: params.body,
    materialId: params.materialId ?? null,
    read: false,
    createdAt: new Date().toISOString(),
  });
  if (error) throw error;
}

/** Notify ALL admins about a new pending material */
export async function notifyAdminsNewMaterial(params: {
  materialId: string;
  materialTitle: string;
  uploaderName: string;
}) {
  const { data: admins, error } = await supabase
    .from("users")
    .select("uid")
    .eq("role", "admin");
  if (error || !admins?.length) return;

  const payload = admins.map((a) => ({
    uid: a.uid as string,
    type: "pending_material",
    title: "📥 New Material Pending Approval",
    body: `"${params.materialTitle}" was submitted by ${params.uploaderName}`,
    materialId: params.materialId,
    read: false,
    createdAt: new Date().toISOString(),
  }));
  await supabase.from("notifications").insert(payload);
}

export async function fetchNotifications(uid: string): Promise<NotificationDoc[]> {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("uid", uid)
    .order("createdAt", { ascending: false })
    .limit(30);
  if (error) throw error;
  return (data ?? []) as NotificationDoc[];
}

export async function markNotificationRead(id: string) {
  const { error } = await supabase.from("notifications").update({ read: true }).eq("id", id);
  if (error) throw error;
}

export async function markAllNotificationsRead(uid: string) {
  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("uid", uid)
    .eq("read", false);
  if (error) throw error;
}
