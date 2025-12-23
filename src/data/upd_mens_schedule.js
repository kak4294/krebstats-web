/**
 * Men's Schedule Update Utilities
 * 
 * This file provides functions to update the men's basketball schedule.
 * Import these functions to programmatically update schedule data.
 * 
 * Usage:
 *   import { updateGameResult, updateGameDate, updateTeamLogo } from './upd_mens_schedule';
 *   
 *   // Update a game result
 *   updateGameResult(9, 'win', '75-68');
 *   
 *   // Update a game date
 *   updateGameDate(9, 'December 30, 2025', 'Tuesday', '6:00 PM');
 *   
 *   // Update a team logo
 *   updateTeamLogo(9, '/imgs/logos/new-logo.png');
 */

import { mensSchedule, mensSummary } from './mensSchedule';

/**
 * Updates the result of a specific game
 * @param {number} gameId - The ID of the game to update
 * @param {string} resultType - 'win' or 'loss'
 * @param {string} score - The score string (e.g., '75-68')
 * @returns {Object} - The updated game object or null if not found
 */
export const updateGameResult = (gameId, resultType, score) => {
  const gameIndex = mensSchedule.findIndex(game => game.id === gameId);
  
  if (gameIndex === -1) {
    console.error(`Game with ID ${gameId} not found`);
    return null;
  }
  
  mensSchedule[gameIndex].result = {
    type: resultType,
    score: score
  };
  mensSchedule[gameIndex].completed = true;
  
  // Update summary records
  recalculateSummary();
  
  console.log(`Updated game ${gameId}: ${resultType} ${score}`);
  return mensSchedule[gameIndex];
};

/**
 * Updates the date and time of a specific game
 * @param {number} gameId - The ID of the game to update
 * @param {string} date - The new date (e.g., 'December 30, 2025')
 * @param {string} day - The day of the week (e.g., 'Tuesday')
 * @param {string} time - The new time (e.g., '7:00 PM')
 * @returns {Object} - The updated game object or null if not found
 */
export const updateGameDate = (gameId, date, day, time) => {
  const gameIndex = mensSchedule.findIndex(game => game.id === gameId);
  
  if (gameIndex === -1) {
    console.error(`Game with ID ${gameId} not found`);
    return null;
  }
  
  mensSchedule[gameIndex].date = date;
  mensSchedule[gameIndex].day = day;
  mensSchedule[gameIndex].time = time;
  
  console.log(`Updated game ${gameId} date to: ${date} (${day}) at ${time}`);
  return mensSchedule[gameIndex];
};

/**
 * Updates the logo path for a specific game's opponent
 * @param {number} gameId - The ID of the game to update
 * @param {string} logoPath - The new logo path (e.g., '/imgs/logos/team.png')
 * @returns {Object} - The updated game object or null if not found
 */
export const updateTeamLogo = (gameId, logoPath) => {
  const gameIndex = mensSchedule.findIndex(game => game.id === gameId);
  
  if (gameIndex === -1) {
    console.error(`Game with ID ${gameId} not found`);
    return null;
  }
  
  mensSchedule[gameIndex].logo = logoPath;
  
  console.log(`Updated game ${gameId} logo to: ${logoPath}`);
  return mensSchedule[gameIndex];
};

/**
 * Updates the location for a specific game
 * @param {number} gameId - The ID of the game to update
 * @param {string} location - The new location string
 * @returns {Object} - The updated game object or null if not found
 */
export const updateGameLocation = (gameId, location) => {
  const gameIndex = mensSchedule.findIndex(game => game.id === gameId);
  
  if (gameIndex === -1) {
    console.error(`Game with ID ${gameId} not found`);
    return null;
  }
  
  mensSchedule[gameIndex].location = location;
  
  console.log(`Updated game ${gameId} location to: ${location}`);
  return mensSchedule[gameIndex];
};

/**
 * Updates the home/away status for a specific game
 * @param {number} gameId - The ID of the game to update
 * @param {string} homeAway - 'home', 'away', or 'neutral'
 * @returns {Object} - The updated game object or null if not found
 */
export const updateGameHomeAway = (gameId, homeAway) => {
  const gameIndex = mensSchedule.findIndex(game => game.id === gameId);
  
  if (gameIndex === -1) {
    console.error(`Game with ID ${gameId} not found`);
    return null;
  }
  
  if (!['home', 'away', 'neutral'].includes(homeAway)) {
    console.error(`Invalid homeAway value: ${homeAway}. Must be 'home', 'away', or 'neutral'`);
    return null;
  }
  
  mensSchedule[gameIndex].homeAway = homeAway;
  
  console.log(`Updated game ${gameId} home/away to: ${homeAway}`);
  return mensSchedule[gameIndex];
};

/**
 * Adds notes to a specific game
 * @param {number} gameId - The ID of the game to update
 * @param {string} notes - The notes to add
 * @returns {Object} - The updated game object or null if not found
 */
export const updateGameNotes = (gameId, notes) => {
  const gameIndex = mensSchedule.findIndex(game => game.id === gameId);
  
  if (gameIndex === -1) {
    console.error(`Game with ID ${gameId} not found`);
    return null;
  }
  
  mensSchedule[gameIndex].notes = notes;
  
  console.log(`Updated game ${gameId} notes to: ${notes}`);
  return mensSchedule[gameIndex];
};

/**
 * Gets a specific game by ID
 * @param {number} gameId - The ID of the game to retrieve
 * @returns {Object} - The game object or null if not found
 */
export const getGame = (gameId) => {
  return mensSchedule.find(game => game.id === gameId) || null;
};

/**
 * Gets all completed games
 * @returns {Array} - Array of completed game objects
 */
export const getCompletedGames = () => {
  return mensSchedule.filter(game => game.completed);
};

/**
 * Gets all upcoming games
 * @returns {Array} - Array of upcoming game objects
 */
export const getUpcomingGames = () => {
  return mensSchedule.filter(game => !game.completed);
};

/**
 * Gets all Liberty League games
 * @returns {Array} - Array of Liberty League game objects
 */
export const getLeagueGames = () => {
  return mensSchedule.filter(game => game.conference === 'Liberty League');
};

/**
 * Recalculates the summary based on current schedule data
 */
const recalculateSummary = () => {
  const completedGames = mensSchedule.filter(game => game.completed && game.conference !== 'Exhibition');
  const leagueGames = completedGames.filter(game => game.conference === 'Liberty League');
  const exhibitionGames = mensSchedule.filter(game => game.conference === 'Exhibition' && game.completed);
  
  mensSummary.completedGames = mensSchedule.filter(game => game.completed).length;
  mensSummary.remainingGames = mensSchedule.length - mensSummary.completedGames;
  
  mensSummary.overallRecord = {
    wins: completedGames.filter(game => game.result?.type === 'win').length,
    losses: completedGames.filter(game => game.result?.type === 'loss').length
  };
  
  mensSummary.leagueRecord = {
    wins: leagueGames.filter(game => game.result?.type === 'win').length,
    losses: leagueGames.filter(game => game.result?.type === 'loss').length
  };
  
  mensSummary.exhibitionRecord = {
    wins: exhibitionGames.filter(game => game.result?.type === 'win').length,
    losses: exhibitionGames.filter(game => game.result?.type === 'loss').length
  };
};

/**
 * Exports the current schedule as a formatted string for backup
 * @returns {string} - JSON string of the current schedule
 */
export const exportSchedule = () => {
  return JSON.stringify({
    schedule: mensSchedule,
    summary: mensSummary
  }, null, 2);
};

export { mensSchedule, mensSummary };

