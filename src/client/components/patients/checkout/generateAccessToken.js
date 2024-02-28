export const generateAccessToken = async () => {
    try {
        const clientId = 'AXFXfhTpTp775JjaH5UJwVPijLmayOeYeNuO-i8OHdtlzhQzavePzvvp0IVi0HnfrH6Egi_gn6buv9QV';
        const clientSecret = 'ECUBk3NbfWOTfxF31w8gcv4FkDzA84NOiEc1FtPWjJm6Vdwe4WHnP06XJt7OjFzbN-B-1E7gQHWxtuXY';
        const auth = btoa(`${clientId}:${clientSecret}`);

        const response = await fetch(
            'https://api-m.sandbox.paypal.com/v1/oauth2/token',
            {
                method: 'POST',
                body: 'grant_type=client_credentials',
                headers: {
                    Authorization: `Basic ${auth}`,
                },
            }
        );

        const data = await response.json();
        return data?.access_token
    } catch (error) {
        console.error('Failed to generate Access Token:', error);
    }
};