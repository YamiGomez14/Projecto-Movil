import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
// Create a single supabase client for interacting with your database 
const supabase = createClient(
    'https://raoqzotaeetwbdooxojy.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhb3F6b3RhZWV0d2Jkb294b2p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc3NDkzMjQsImV4cCI6MTk2MzMyNTMyNH0.RwebjaXMvs8Lqk5JwYD_cW6Oj2W-NMHNe--vvMmDdqU',
    {
        localStorage: AsyncStorage as any,
    })

export default supabase;