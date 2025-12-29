/**
 * Report Mappings
 * Maps team names to their corresponding player and team analysis reports
 */

// Helper function to normalize team names for matching
const normalizeTeamName = (teamName) => {
  return teamName
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
};

// Player report mappings
export const playerReports = {
  mens: {
    'brockport': '/data/player-reports/mens/Brockport_Mens_Player_Analysis.pdf',
    'keuka': '/data/player-reports/mens/Keuka_Mens_Player_Analysis.pdf',
    'nazareth': '/data/player-reports/mens/Nazareth_Mens_Player_Analysis.pdf',
    'skidmore': '/data/player-reports/mens/Skidmore_Thoroughbreds_Player_Analysis_Mens.pdf',
    'cnu': '/data/player-reports/mens/CNU_Player_Analysis_Mens.pdf',
    'christopher_newport': '/data/player-reports/mens/CNU_Player_Analysis_Mens.pdf',
    'jwu_charlotte': '/data/player-reports/mens/JWU_Charlotte_Player_Analysis_Mens.pdf',
    'johnson_wales_nc': '/data/player-reports/mens/JWU_Charlotte_Player_Analysis_Mens.pdf',
    'johnson_wales_charlotte': '/data/player-reports/mens/JWU_Charlotte_Player_Analysis_Mens.pdf',
    'johnson_wales_n_c': '/data/player-reports/mens/JWU_Charlotte_Player_Analysis_Mens.pdf',
  },
  womens: {
    'allegheny': '/data/player-reports/womens/Allegheny_Player_Analysis.pdf',
    'bard': '/data/player-reports/womens/Bard_College_Player_Analysis_Womens.pdf',
    'chatham': '/data/player-reports/womens/Chatham_Player_Analysis.pdf',
    'emmanuel': '/data/player-reports/womens/Emmanuel_Womens_Player_Analysis.pdf',
    'geneseo': '/data/player-reports/womens/Geneseo_Womens_Player_Analysis.pdf',
    'skidmore': '/data/player-reports/womens/Skidmore_Thoroughbreds_Player_Analysis_Womens.pdf',
    'stevens': '/data/player-reports/womens/Stevens_Womens_Player_Analysis.pdf',
  }
};

// Team report mappings
export const teamReports = {
  mens: {
    // No men's team reports currently available
  },
  womens: {
    'chatham': '/data/team-reports/womens/Chatham_Team_Analysis.pdf',
    'allegheny': '/data/team-reports/womens/Womens_RIT_Alleghany_Team_Analysis_Report.pdf',
  }
};

// Function to get player report for a team
export const getPlayerReport = (teamName, gender) => {
  const normalizedName = normalizeTeamName(teamName);
  const genderReports = playerReports[gender] || {};
  
  // Try exact match first
  if (genderReports[normalizedName]) {
    return genderReports[normalizedName];
  }
  
  // Try partial matches for common team name variations
  const teamKeys = Object.keys(genderReports);
  for (const key of teamKeys) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return genderReports[key];
    }
  }
  
  return null;
};

// Function to get team report for a team
export const getTeamReport = (teamName, gender) => {
  const normalizedName = normalizeTeamName(teamName);
  const genderReports = teamReports[gender] || {};
  
  // Try exact match first
  if (genderReports[normalizedName]) {
    return genderReports[normalizedName];
  }
  
  // Try partial matches for common team name variations
  const teamKeys = Object.keys(genderReports);
  for (const key of teamKeys) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return genderReports[key];
    }
  }
  
  return null;
};

// Function to check if any reports are available for a team
export const hasReports = (teamName, gender) => {
  return getPlayerReport(teamName, gender) !== null || getTeamReport(teamName, gender) !== null;
};

// Function to get all available reports for a team
export const getAvailableReports = (teamName, gender) => {
  const reports = [];
  
  const playerReport = getPlayerReport(teamName, gender);
  if (playerReport) {
    reports.push({
      type: 'Player',
      path: playerReport,
      title: `${teamName} Player Analysis`
    });
  }
  
  const teamReport = getTeamReport(teamName, gender);
  if (teamReport) {
    reports.push({
      type: 'Team',
      path: teamReport,
      title: `${teamName} Team Analysis`
    });
  }
  
  return reports;
};

export default {
  playerReports,
  teamReports,
  getPlayerReport,
  getTeamReport,
  hasReports,
  getAvailableReports
};
