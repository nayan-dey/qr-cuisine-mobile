import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

// // Production credentials
// const prodSupabaseUrl = "https://nvvsoihxmczidolcqgru.supabase.co";
// const prodSupabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52dnNvaWh4bWN6aWRvbGNxZ3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2NjU0NzcsImV4cCI6MjA0NTI0MTQ3N30.KS8f8i-t56eYVYYz9U_XVVp5R8QMIKHvjF4GViqqoL4";

// // Development credentials
// const devSupabaseUrl = "https://icyaglvxuziqfcxwtymo.supabase.co";
// const devSupabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljeWFnbHZ4dXppcWZjeHd0eW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3Mjc3OTQsImV4cCI6MjA0MjMwMzc5NH0.NCYQ-48zeXzqSeeAsGS_voi5T8LdONE9NXxdvIxOrYU";

const supabaseUrl_INDIA = "https://icyaglvxuziqfcxwtymo.supabase.co";
const supabaseAnonKey_INDIA =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljeWFnbHZ4dXppcWZjeHd0eW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3Mjc3OTQsImV4cCI6MjA0MjMwMzc5NH0.NCYQ-48zeXzqSeeAsGS_voi5T8LdONE9NXxdvIxOrYU";

const supabaseUrl_USA = "https://sbdojdtuhkfedsnvcgie.supabase.co";
const supabaseAnonKey_USA =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiZG9qZHR1aGtmZWRzbnZjZ2llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4NTI3ODAsImV4cCI6MjAzODQyODc4MH0.q88fqjQONZMIQsdW2dURA0nWCx27HSEkd7PdhX_xdx0";

export const supabase = createClient(supabaseUrl_INDIA, supabaseAnonKey_INDIA, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
