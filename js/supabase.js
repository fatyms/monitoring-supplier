import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

export const supabase = createClient(
  'https://onagcdgzuqoqtowwfvmu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uYWdjZGd6dXFvcXRvd3dmdm11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5MzU1NDAsImV4cCI6MjA4MTUxMTU0MH0.YydT3OZ6_S1ewnrG4HamOg2eoNE63eYvPolvFtjMNhs'
)

