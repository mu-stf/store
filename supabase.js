// supabase.js (sample)
// Copy this file, replace the URL and anon key with values from your Supabase project.
// Include this file before app.js and after loading the supabase-js client.

// Example usage in HTML:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js/dist/supabase.min.js"></script>
// <script src="supabase.js"></script>

(function () {
  // Replace the placeholders below with your Supabase details
  const SUPABASE_URL = "https://kztjouywtnorkbvmtpwa.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6dGpvdXl3dG5vcmtidm10cHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NzE1NDYsImV4cCI6MjA4MjM0NzU0Nn0.0k2Z62bwVv7UKOf6XIOkxxM2oC1Gs_nGap93BblW-VA";

  if (SUPABASE_URL.includes('your-project')) {
    console.warn('supabase.js: replace SUPABASE_URL and SUPABASE_ANON_KEY with your project values. Running in local/offline mode.');
    return;
  }

  try {
    if (typeof supabase === 'undefined') {
      console.error('Supabase library (CDN) failed to load.');
      return;
    }
    // `supabase` global is created by the supabase-js script
    window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase client initialized successfully');
  } catch (e) {
    console.error('Failed to initialize supabase client:', e);
  }
})();
