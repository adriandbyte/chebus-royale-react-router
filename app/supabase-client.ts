import { createClient } from '@supabase/supabase-js';


const SUPABASE_URL = "https://oxvnwczfptcyglrvhuvv.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94dm53Y3pmcHRjeWdscnZodXZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNTk5ODQsImV4cCI6MjA2MjczNTk4NH0.ElJjGRLlRdyK-xOcbL0ZHWwyLW38PHDBiZvF1oRQwbI"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);