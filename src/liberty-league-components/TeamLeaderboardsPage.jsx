import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Trophy, 
  ChevronDown, 
  ChevronUp, 
  Loader2, 
  RefreshCw,
  Search,
  Filter,
  X
} from 'lucide-react';

const STATIC_DATA_PATH = "/data/stats";

// Reusable Expandable Stats Section Component with Filters
const StatsSection = ({ 
  title, 
  description, 
  data, 
  columns, 
  loading, 
  error,
  defaultExpanded = false,
  colorScheme,
  // Filter options
  availablePlayTypes = [],
  availableTeams = [],
  showPlayTypeFilter = false,
  showTeamFilter = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('DESC');
  
  // Filter states
  const [selectedPlayTypes, setSelectedPlayTypes] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters
  const filteredData = useMemo(() => {
    let result = [...data];
    
    // Filter by play types
    if (selectedPlayTypes.length > 0 && showPlayTypeFilter) {
      result = result.filter(row => selectedPlayTypes.includes(row.PLAY_TYPE));
    }
    
    // Filter by teams
    if (selectedTeams.length > 0 && showTeamFilter) {
      result = result.filter(row => selectedTeams.includes(row.TEAM));
    }
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(row => 
        Object.values(row).some(val => 
          String(val).toLowerCase().includes(term)
        )
      );
    }
    
    return result;
  }, [data, selectedPlayTypes, selectedTeams, searchTerm, showPlayTypeFilter, showTeamFilter]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      let aVal = a[sortColumn];
      let bVal = b[sortColumn];
      
      if (aVal === null || aVal === undefined) aVal = sortDirection === 'DESC' ? -Infinity : Infinity;
      if (bVal === null || bVal === undefined) bVal = sortDirection === 'DESC' ? -Infinity : Infinity;
      
      const aNum = parseFloat(aVal);
      const bNum = parseFloat(bVal);
      
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return sortDirection === 'DESC' ? bNum - aNum : aNum - bNum;
      }
      
      const aStr = String(aVal);
      const bStr = String(bVal);
      return sortDirection === 'DESC' ? bStr.localeCompare(aStr) : aStr.localeCompare(bStr);
    });
  }, [filteredData, sortColumn, sortDirection]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'DESC' ? 'ASC' : 'DESC');
    } else {
      setSortColumn(column);
      setSortDirection('DESC');
    }
  };

  const togglePlayType = (pt) => {
    setSelectedPlayTypes(prev => 
      prev.includes(pt) ? prev.filter(p => p !== pt) : [...prev, pt]
    );
  };

  const toggleTeam = (team) => {
    setSelectedTeams(prev => 
      prev.includes(team) ? prev.filter(t => t !== team) : [...prev, team]
    );
  };

  const clearAllFilters = () => {
    setSelectedPlayTypes([]);
    setSelectedTeams([]);
    setSearchTerm('');
  };

  const hasActiveFilters = selectedPlayTypes.length > 0 || selectedTeams.length > 0 || searchTerm;

  const formatValue = (value, key) => {
    if (value === null || value === undefined) return "—";
    if (typeof value === "number") {
      if (key.includes("PPP") || key.includes("PCTL") || key.includes("PERCENTILE")) return value.toFixed(2);
      if (key.includes("PCT") && !key.includes("PCTL") && !key.includes("PERCENTILE")) return value.toFixed(1) + "%";
      if (key.includes("%") && !key.includes("PERCENTILE")) return value.toFixed(1) + "%";
      return value.toLocaleString();
    }
    return value;
  };

  return (
    <div style={{
      backgroundColor: colorScheme.cardBg,
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      border: `1px solid ${colorScheme.cardBorder}`,
      marginBottom: '20px',
    }}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          backgroundColor: isExpanded ? colorScheme.accentLight : colorScheme.cardBg,
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: colorScheme.primaryText, marginBottom: '6px', fontFamily: "'JetBrains Mono', monospace" }}>
            {title}
          </h3>
          <p style={{ fontSize: '0.85rem', color: colorScheme.secondaryText, margin: 0, fontFamily: "'JetBrains Mono', monospace" }}>
            {description}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.75rem', color: colorScheme.secondaryText, backgroundColor: '#f0f0f0', padding: '4px 10px', borderRadius: '12px', fontWeight: '600' }}>
            {sortedData.length} rows
          </span>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            backgroundColor: isExpanded ? colorScheme.accent : '#f0f0f0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {isExpanded ? <ChevronUp size={18} color="white" /> : <ChevronDown size={18} color={colorScheme.secondaryText} />}
          </div>
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div style={{ borderTop: `1px solid ${colorScheme.cardBorder}` }}>
          {/* Filters Bar */}
          <div style={{ padding: '16px 24px', backgroundColor: '#fafafa', borderBottom: `1px solid ${colorScheme.cardBorder}` }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
              {/* Search */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                backgroundColor: 'white', border: `1px solid ${colorScheme.cardBorder}`,
                borderRadius: '8px', padding: '6px 12px', minWidth: '200px',
              }}>
                <Search size={14} color={colorScheme.secondaryText} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ border: 'none', outline: 'none', fontSize: '0.8rem', fontFamily: "'JetBrains Mono', monospace", width: '100%', backgroundColor: 'transparent' }}
                />
              </div>

              {/* Filter Toggle Button */}
              {(showPlayTypeFilter || showTeamFilter) && (
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '6px 12px', backgroundColor: showFilters ? colorScheme.accent : 'white',
                    border: `1px solid ${showFilters ? colorScheme.accent : colorScheme.cardBorder}`,
                    borderRadius: '8px', fontSize: '0.8rem', fontWeight: '500', cursor: 'pointer',
                    color: showFilters ? 'white' : colorScheme.primaryText,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  <Filter size={14} />
                  Filters
                  {hasActiveFilters && (
                    <span style={{
                      backgroundColor: showFilters ? 'white' : colorScheme.accent,
                      color: showFilters ? colorScheme.accent : 'white',
                      fontSize: '0.65rem', padding: '2px 6px', borderRadius: '10px',
                    }}>
                      {selectedPlayTypes.length + selectedTeams.length}
                    </span>
                  )}
                </button>
              )}

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    padding: '6px 12px', backgroundColor: 'transparent', border: 'none',
                    fontSize: '0.8rem', color: colorScheme.accent, cursor: 'pointer',
                    fontFamily: "'JetBrains Mono', monospace", fontWeight: '500',
                  }}
                >
                  <X size={14} />
                  Clear all
                </button>
              )}
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Play Type Filter */}
                {showPlayTypeFilter && availablePlayTypes.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: '600', color: colorScheme.secondaryText, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Play Types
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {availablePlayTypes.map(pt => (
                        <button
                          key={pt}
                          onClick={() => togglePlayType(pt)}
                          style={{
                            padding: '4px 10px', borderRadius: '14px', fontSize: '0.75rem', fontWeight: '500',
                            border: 'none', cursor: 'pointer',
                            backgroundColor: selectedPlayTypes.includes(pt) ? colorScheme.accent : '#e8e8e8',
                            color: selectedPlayTypes.includes(pt) ? 'white' : colorScheme.primaryText,
                            fontFamily: "'JetBrains Mono', monospace",
                          }}
                        >
                          {pt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Team Filter */}
                {showTeamFilter && availableTeams.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: '600', color: colorScheme.secondaryText, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Teams
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {availableTeams.map(team => (
                        <button
                          key={team}
                          onClick={() => toggleTeam(team)}
                          style={{
                            padding: '4px 10px', borderRadius: '14px', fontSize: '0.75rem', fontWeight: '500',
                            border: 'none', cursor: 'pointer',
                            backgroundColor: selectedTeams.includes(team) ? colorScheme.accent : '#e8e8e8',
                            color: selectedTeams.includes(team) ? 'white' : colorScheme.primaryText,
                            fontFamily: "'JetBrains Mono', monospace",
                          }}
                        >
                          {team}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Table */}
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px', gap: '12px', color: colorScheme.secondaryText }}>
              <Loader2 size={24} className="animate-spin" />
              <span>Loading...</span>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#e74c3c' }}>{error}</div>
          ) : sortedData.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: colorScheme.secondaryText }}>No data found</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', fontFamily: "'JetBrains Mono', monospace" }}>
                <thead>
                  <tr>
                    {columns.map((col) => (
                      <th
                        key={col.key}
                        onClick={() => col.sortable !== false && handleSort(col.key)}
                        style={{
                          padding: '12px 14px', textAlign: 'left', fontSize: '0.7rem', fontWeight: '700',
                          color: sortColumn === col.key ? 'white' : colorScheme.secondaryText,
                          backgroundColor: sortColumn === col.key ? colorScheme.accent : '#f5f5f5',
                          textTransform: 'uppercase', letterSpacing: '0.5px',
                          borderBottom: `2px solid ${colorScheme.cardBorder}`,
                          cursor: col.sortable !== false ? 'pointer' : 'default', whiteSpace: 'nowrap',
                        }}
                      >
                        {col.label}
                        {sortColumn === col.key && (sortDirection === 'DESC' ? ' ↓' : ' ↑')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedData.slice(0, 150).map((row, idx) => (
                    <tr
                      key={idx}
                      style={{ borderBottom: `1px solid ${colorScheme.cardBorder}` }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          style={{
                            padding: '10px 14px',
                            color: col.highlight ? colorScheme.accent : colorScheme.primaryText,
                            fontWeight: col.bold ? '600' : '400', whiteSpace: 'nowrap',
                          }}
                        >
                          {formatValue(row[col.key], col.key)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {sortedData.length > 150 && (
                <div style={{ padding: '12px', textAlign: 'center', fontSize: '0.8rem', color: colorScheme.secondaryText, backgroundColor: '#fafafa' }}>
                  Showing first 150 of {sortedData.length} rows
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const TeamLeaderboardsPage = () => {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState('mens');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  // Data states
  const [teamOffensiveEfficiency, setTeamOffensiveEfficiency] = useState([]);
  const [teamShotFrequency, setTeamShotFrequency] = useState([]);
  const [teamPlaytypeShotFrequency, setTeamPlaytypeShotFrequency] = useState([]);
  
  // Metadata
  const [availablePlayTypes, setAvailablePlayTypes] = useState([]);
  const [availableTeams, setAvailableTeams] = useState([]);
  
  const [allData, setAllData] = useState({ mens: null, womens: null });

  const colorScheme = {
    background: '#f8f8f8',
    cardBg: '#ffffff',
    cardBorder: '#fff1e6',
    primaryText: '#333333',
    secondaryText: '#5a5a5a',
    accentLight: '#fff1e6',
    accent: '#ff9a5a',
  };

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const genders = ['mens', 'womens'];
        const dataCache = { mens: null, womens: null };
        
        for (const gender of genders) {
          const [effRes, shotFreqRes, playtypeFreqRes, playTypesRes, teamsRes] = await Promise.all([
            fetch(`${STATIC_DATA_PATH}/${gender}/team-offensive-efficiency.json`),
            fetch(`${STATIC_DATA_PATH}/${gender}/team-shot-location-frequency.json`),
            fetch(`${STATIC_DATA_PATH}/${gender}/team-playtype-shot-frequency.json`),
            fetch(`${STATIC_DATA_PATH}/${gender}/play-types.json`),
            fetch(`${STATIC_DATA_PATH}/${gender}/teams.json`)
          ]);

          if (!effRes.ok || !shotFreqRes.ok || !playtypeFreqRes.ok) {
            throw new Error("Data not found. Run: python backend/fetch_and_cache.py");
          }

          const [effData, shotFreqData, playtypeFreqData, playTypesData, teamsData] = await Promise.all([
            effRes.json(),
            shotFreqRes.json(),
            playtypeFreqRes.json(),
            playTypesRes.json(),
            teamsRes.json()
          ]);

          dataCache[gender] = {
            teamOffensiveEfficiency: effData,
            teamShotFrequency: shotFreqData,
            teamPlaytypeShotFrequency: playtypeFreqData,
            playTypes: playTypesData.play_types || [],
            teams: teamsData.teams || []
          };
        }

        setAllData(dataCache);
        
        const mensData = dataCache.mens;
        setTeamOffensiveEfficiency(mensData.teamOffensiveEfficiency.data || []);
        setTeamShotFrequency(mensData.teamShotFrequency.data || []);
        setTeamPlaytypeShotFrequency(mensData.teamPlaytypeShotFrequency.data || []);
        setAvailablePlayTypes(mensData.playTypes);
        setAvailableTeams(mensData.teams);
        setLastUpdated(mensData.teamOffensiveEfficiency.fetched_at);
        
      } catch (err) {
        console.error("Failed to load data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Update when gender changes
  useEffect(() => {
    if (allData[selectedGender]) {
      const genderData = allData[selectedGender];
      setTeamOffensiveEfficiency(genderData.teamOffensiveEfficiency.data || []);
      setTeamShotFrequency(genderData.teamShotFrequency.data || []);
      setTeamPlaytypeShotFrequency(genderData.teamPlaytypeShotFrequency.data || []);
      setAvailablePlayTypes(genderData.playTypes);
      setAvailableTeams(genderData.teams);
      setLastUpdated(genderData.teamOffensiveEfficiency.fetched_at);
    }
  }, [selectedGender, allData]);

  const formatLastUpdated = (isoString) => {
    if (!isoString) return null;
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
  };

  // Column definitions
  const teamOffensiveEfficiencyColumns = [
    { key: 'TEAM', label: 'Team', bold: true, sortable: true },
    { key: 'PLAY_TYPE', label: 'Play Type', bold: true, sortable: true },
    { key: 'PLAY_COUNT', label: 'Plays', sortable: true },
    { key: 'PPP', label: 'PPP', highlight: true, sortable: true },
    { key: '2PA', label: '2PA', sortable: true },
    { key: '2PM', label: '2PM', sortable: true },
    { key: '2P%', label: '2P%', sortable: true },
    { key: '3PA', label: '3PA', sortable: true },
    { key: '3PM', label: '3PM', sortable: true },
    { key: '3P%', label: '3P%', sortable: true },
    { key: 'PPP_PERCENTILE', label: 'PPP %ile', highlight: true, sortable: true },
    { key: '2P%_PERCENTILE', label: '2P% %ile', highlight: true, sortable: true },
    { key: '3P%_PERCENTILE', label: '3P% %ile', highlight: true, sortable: true },
  ];

  const teamShotFrequencyColumns = [
    { key: 'TEAM', label: 'Team', bold: true, sortable: true },
    { key: 'TOTAL_SHOTS', label: 'Total Shots', sortable: true },
    { key: 'LAYUP_COUNT', label: 'Layups', sortable: true },
    { key: 'LAYUP_PCT', label: 'Layup %', highlight: true, sortable: true },
    { key: 'CLOSE_COUNT', label: 'Close', sortable: true },
    { key: 'CLOSE_PCT', label: 'Close %', highlight: true, sortable: true },
    { key: 'MID_COUNT', label: 'Mid', sortable: true },
    { key: 'MID_PCT', label: 'Mid %', highlight: true, sortable: true },
    { key: 'THREE_COUNT', label: '3P', sortable: true },
    { key: 'THREE_PCT', label: '3P %', highlight: true, sortable: true },
  ];

  const teamPlaytypeShotFrequencyColumns = [
    { key: 'TEAM', label: 'Team', bold: true, sortable: true },
    { key: 'PLAY_TYPE', label: 'Play Type', bold: true, sortable: true },
    { key: 'TOTAL_SHOTS', label: 'Total Shots', sortable: true },
    { key: 'LAYUP_PCT', label: 'Layup %', highlight: true, sortable: true },
    { key: 'CLOSE_PCT', label: 'Close %', highlight: true, sortable: true },
    { key: 'MID_PCT', label: 'Mid %', highlight: true, sortable: true },
    { key: 'THREE_PCT', label: '3P %', highlight: true, sortable: true },
  ];

  const styles = {
    container: { minHeight: 'calc(100vh - 80px)', padding: '40px 20px', fontFamily: "'JetBrains Mono', monospace" },
    contentWrapper: { maxWidth: '1400px', margin: '0 auto' },
    backButton: {
      display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
      backgroundColor: 'transparent', border: `2px solid ${colorScheme.accent}`,
      borderRadius: '12px', color: colorScheme.accent, cursor: 'pointer',
      fontFamily: "'JetBrains Mono', monospace", fontWeight: '600', fontSize: '0.9rem', marginBottom: '30px',
    },
    header: { textAlign: 'center', marginBottom: '30px' },
    title: { fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '700', color: colorScheme.primaryText, marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' },
    subtitle: { fontSize: '0.95rem', color: colorScheme.secondaryText },
    filtersCard: {
      backgroundColor: colorScheme.cardBg, borderRadius: '16px', padding: '20px', marginBottom: '24px',
      border: `1px solid ${colorScheme.cardBorder}`, boxShadow: '0 4px 15px rgba(255, 154, 90, 0.08)',
      display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '15px',
    },
    toggleGroup: { display: 'flex', gap: '5px', backgroundColor: '#f5f5f5', padding: '5px', borderRadius: '12px' },
    toggleButton: { padding: '10px 20px', fontSize: '0.9rem', fontWeight: '600', fontFamily: "'JetBrains Mono', monospace", border: 'none', borderRadius: '8px', cursor: 'pointer' },
    lastUpdated: { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: colorScheme.secondaryText },
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <button
          style={styles.backButton}
          onClick={() => navigate('/liberty-league-stats')}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = colorScheme.accent; e.currentTarget.style.color = 'white'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = colorScheme.accent; }}
        >
          <ArrowLeft size={18} />
          Back to Statistics
        </button>

        <div style={styles.header}>
          <h1 style={styles.title}>
            <Trophy size={28} color={colorScheme.accent} />
            Team Statistics
          </h1>
          <p style={styles.subtitle}>Detailed team offensive analytics across the Liberty League</p>
        </div>

        <div style={styles.filtersCard}>
          <div style={styles.toggleGroup}>
            {['mens', 'womens'].map((gender) => (
              <button
                key={gender}
                style={{ ...styles.toggleButton, backgroundColor: selectedGender === gender ? colorScheme.accent : 'transparent', color: selectedGender === gender ? 'white' : colorScheme.primaryText }}
                onClick={() => setSelectedGender(gender)}
              >
                {gender === 'mens' ? "Men's" : "Women's"}
              </button>
            ))}
          </div>
          {lastUpdated && (
            <div style={styles.lastUpdated}>
              <RefreshCw size={12} />
              Updated: {formatLastUpdated(lastUpdated)}
        </div>
          )}
        </div>

        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px', gap: '12px', color: colorScheme.secondaryText }}>
            <Loader2 size={28} className="animate-spin" />
            <span style={{ fontSize: '1.1rem' }}>Loading team statistics...</span>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '60px', backgroundColor: colorScheme.cardBg, borderRadius: '16px', border: `1px solid ${colorScheme.cardBorder}` }}>
            <p style={{ color: '#e74c3c', marginBottom: '12px', fontWeight: '600' }}>{error}</p>
            <p style={{ fontSize: '0.85rem', color: colorScheme.secondaryText }}>
              Run: <code style={{ backgroundColor: '#f5f5f5', padding: '4px 8px', borderRadius: '4px' }}>python backend/fetch_and_cache.py</code>
            </p>
          </div>
        ) : (
          <>
            <StatsSection
              title="Team Offensive Efficiency by Play Type"
              description="Team offensive efficiency broken down by play type - shows PPP, shooting percentages, and percentile rankings"
              data={teamOffensiveEfficiency}
              columns={teamOffensiveEfficiencyColumns}
              loading={false}
              error={null}
              defaultExpanded={true}
              colorScheme={colorScheme}
              showPlayTypeFilter={true}
              showTeamFilter={true}
              availablePlayTypes={availablePlayTypes}
              availableTeams={availableTeams}
            />

            <StatsSection
              title="Team Shot Distribution"
              description="Overall team shot distribution showing percentage of shots from each court zone"
              data={teamShotFrequency}
              columns={teamShotFrequencyColumns}
              loading={false}
              error={null}
              defaultExpanded={false}
              colorScheme={colorScheme}
              showPlayTypeFilter={false}
              showTeamFilter={true}
              availablePlayTypes={[]}
              availableTeams={availableTeams}
            />

            <StatsSection
              title="Team Shot Distribution by Play Type"
              description="Team shot distribution broken down by play type - where do teams shoot from on each offensive action?"
              data={teamPlaytypeShotFrequency}
              columns={teamPlaytypeShotFrequencyColumns}
              loading={false}
              error={null}
              defaultExpanded={false}
              colorScheme={colorScheme}
              showPlayTypeFilter={true}
              showTeamFilter={true}
              availablePlayTypes={availablePlayTypes}
              availableTeams={availableTeams}
            />
          </>
        )}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
};

export default TeamLeaderboardsPage;
