import { supabase } from "@/lib/supabase";

interface CreateOrderParams {
  userEmail: string;
  total: number;
  items: any[];
}

export const createOrder = async ({ userEmail, total, items }: CreateOrderParams) => {
  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      user_email: userEmail,
      total_amount: total,
      status: 'pending',
      items: items,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return order;
};

export const updateOrderStatus = async (orderId: string, status: 'completed' | 'failed') => {
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);

  if (error) throw error;
};