export const TARGET_API_LABELS = {
  api_particulier: 'API Particulier',
  franceconnect: 'FranceConnect',
  api_entreprise: 'API Entreprise',
  preuve_covoiturage: 'Registre de preuve de covoiturage',
  api_impot_particulier_sandbox: 'API Impôt particulier (Bac à sable)',
  api_impot_particulier_production: 'API Impôt particulier (Production)',
  api_impot_particulier_fc_sandbox: 'API Impôt particulier (FC - Bac à sable)',
  api_impot_particulier_fc_production:
    'API Impôt particulier (FC - Production)',
  api_r2p_sandbox: 'API R2P (Bac à sable)',
  api_r2p_production: 'API R2P (Production)',
  api_hermes_sandbox: 'API Hermes (Bac à sable)',
  api_hermes_production: 'API Hermes (Production)',
  api_e_contacts_sandbox: 'API E-Contacts (Bac à sable)',
  api_e_contacts_production: 'API E-Contacts (Production)',
  api_opale_sandbox: 'API OPALE (Bac à sable)',
  api_opale_production: 'API OPALE (Production)',
  api_mire_sandbox: 'API MIRE (Bac à sable)',
  api_mire_production: 'API MIRE (Production)',
  api_ocfi_sandbox: 'API OCFI (Bac à sable)',
  api_ocfi_production: 'API OCFI (Production)',
  api_e_pro_sandbox: 'API E-PRO (Bac à sable)',
  api_e_pro_production: 'API E-PRO (Production)',
  api_robf_sandbox: 'API ROBF (Bac à sable)',
  api_robf_production: 'API ROBF (Production)',
  api_cpr_pro_sandbox: 'API CPR PRO - ADELIE (Bac à sable)',
  api_cpr_pro_production: 'API CPR PRO - ADELIE (Production)',
  api_infinoe_sandbox: 'API INFINOE (Bac à sable)',
  api_infinoe_production: 'API INFINOE (Production)',
  api_ficoba_sandbox: 'API FICOBA (Bac à sable)',
  api_ficoba_production: 'API FICOBA (Production)',
  api_droits_cnam: 'API Droits CNAM',
  le_taxi_clients: 'le.Taxi - applicatifs clients',
  le_taxi_chauffeurs: 'le.Taxi - applicatifs chauffeurs',
  cartobio: 'CartoBio - Territoires',
  aidants_connect: 'Aidants Connect',
  api_service_national: 'API Service National',
  api_statut_etudiant: 'API Statut étudiant',
  api_tiers_de_prestation: 'API Tiers de prestation',
  hubee: 'HubEE',
  api_pro_sante_connect: 'API Pro Santé Connect',
  api_declaration_auto_entrepreneur: 'API Tierce Déclaration auto-entrepreneur',
  api_indemnites_journalieres_cnam: 'API Indemnités Journalières (CNAM)',
};

export const TARGET_API_WITH_ENROLLMENTS_IN_PRODUCTION_ENV = [
  'franceconnect',
  'api_entreprise',
  'api_particulier',
  'cartobio',
  'api_impot_particulier_sandbox',
  'api_impot_particulier_production',
  'api_r2p_sandbox',
  'api_r2p_production',
  'api_impot_particulier_fc_sandbox',
  'api_impot_particulier_fc_production',
  'le_taxi_clients',
  'le_taxi_chauffeurs',
  'api_droits_cnam',
  'api_ficoba_sandbox',
  'api_ficoba_production',
  'aidants_connect',
  'hubee',
  // 'preuve_covoiturage',
  // 'api_service_national',
  // 'api_statut_etudiant',
  // 'api_hermes_sandbox',
  // 'api_hermes_production',
  // 'api_tiers_de_prestation',
  // 'api_pro_sante_connect',
  // 'api_declaration_auto_entrepreneur',
  // 'api_indemnites_journalieres_cnam',
];

export const API_ICONS = {
  api_particulier: 'logo-beta-gouv.svg',
  franceconnect: 'logo-fc-with-label.png',
  api_impot_particulier_sandbox: 'logo-dgfip-with-label.png',
  api_impot_particulier_production: 'logo-dgfip-with-label.png',
  api_impot_particulier_fc_sandbox: 'logo-dgfip-with-label.png',
  api_impot_particulier_fc_production: 'logo-dgfip-with-label.png',
  api_r2p_sandbox: 'logo-dgfip-with-label.png',
  api_r2p_production: 'logo-dgfip-with-label.png',
  api_hermes_sandbox: 'logo-dgfip-with-label.png',
  api_hermes_production: 'logo-dgfip-with-label.png',
  api_e_contacts_sandbox: 'logo-dgfip-with-label.png',
  api_e_contacts_production: 'logo-dgfip-with-label.png',
  api_opale_sandbox: 'logo-dgfip-with-label.png',
  api_opale_production: 'logo-dgfip-with-label.png',
  api_mire_sandbox: 'logo-dgfip-with-label.png',
  api_mire_production: 'logo-dgfip-with-label.png',
  api_ocfi_sandbox: 'logo-dgfip-with-label.png',
  api_ocfi_production: 'logo-dgfip-with-label.png',
  api_e_pro_sandbox: 'logo-dgfip-with-label.png',
  api_e_pro_production: 'logo-dgfip-with-label.png',
  api_robf_sandbox: 'logo-dgfip-with-label.png',
  api_robf_production: 'logo-dgfip-with-label.png',
  api_cpr_pro_sandbox: 'logo-dgfip-with-label.png',
  api_cpr_pro_production: 'logo-dgfip-with-label.png',
  api_infinoe_sandbox: 'logo-dgfip-with-label.png',
  api_infinoe_production: 'logo-dgfip-with-label.png',
  api_ficoba_sandbox: 'logo-dgfip-with-label.png',
  api_ficoba_production: 'logo-dgfip-with-label.png',
  api_droits_cnam: 'logo-cnam.jpg',
  le_taxi_clients: 'logo-le.taxi.svg',
  le_taxi_chauffeurs: 'logo-le.taxi.svg',
  cartobio: 'logo-cartobio-text.svg',
  aidants_connect: 'aidants-connect_logo.png',
  api_tiers_de_prestation: 'logo-urssaf.png',
  hubee: 'logo-dinum.png',
  api_pro_sante_connect: 'logo-ans.png',
  api_declaration_auto_entrepreneur: 'logo-urssaf.png',
  api_indemnites_journalieres_cnam: 'logo-cnam.jpg',
};
