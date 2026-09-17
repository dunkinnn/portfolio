// Single source for the contact details and profile links. Shared by the
// Contact section and the footer so the two cannot drift apart.

export const REAL_EMAIL = 'angeloubulauan04@gmail.com'
export const PHONE_NUMBER = '+639970710157'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/angelou-bulauan-125401338/'
export const FACEBOOK_URL = 'https://www.facebook.com/angelou.bulauan'
// wa.me wants digits only - no plus sign, no spaces.
export const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER.replace(/\D/g, '')}`
export const LOCATION = 'Isabela, Philippines'
