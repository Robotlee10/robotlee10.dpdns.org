<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Services</title>
    <!-- Load the Supabase tool dynamically -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
</head>
<body>
    <div id="services-container">Loading services...</div>

    <script>
        // Connect to your specific Supabase project
        const supabaseUrl = 'https://yrpfevxzocpe.supabase.co';
        const supabaseKey = 'PASTE_YOUR_ANON_PUBLIC_KEY_HERE';
        const supabase = supabase.createClient(supabaseUrl, supabaseKey);

        async function loadServices() {
            // Fetch data from your 'services' table
            let { data: services, error } = await supabase
                .from('services')
                .select('*');

            const container = document.getElementById('services-container');
            
            if (error) {
                container.innerHTML = 'Error loading data.';
                return;
            }

            // Loop through your database rows and build HTML
            container.innerHTML = services.map(service => `
                <div style="border: 1px solid #ccc; padding: 20px; margin: 10px; border-radius: 8px;">
                    <h2>${service.title}</h2>
                    <p>${service.description}</p>
                </div>
            `).join('');
        }

        loadServices();
    </script>
</body>
</html>
  
