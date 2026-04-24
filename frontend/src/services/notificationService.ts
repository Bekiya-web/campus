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
