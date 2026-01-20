import React, { useState, useEffect } from "react";
import { BarChart3, Filter, ChevronDown, Loader2, ToggleLeft, ToggleRight, RefreshCw } from "lucide-react";

// Static data path (from public folder)
const STATIC_DATA_PATH = "/data/stats";

export default function TeamStatisticsSection() {
  const [gender, setGender] = useState("mens");
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState({ mens: null, womens: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  // Filters
  const [includePercentiles, setIncludePercentiles] = useState(true);
  const [selectedPlayTypes, setSelectedPlayTypes] = useState([]);
  const [availablePlayTypes, setAvailablePlayTypes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Load static data on mount
  useEffect(() => {
    const loadStaticData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Load both mens and womens data upfront
        const [mensRes, womensRes, mensPlayTypesRes, womensPlayTypesRes] = await Promise.all([
          fetch(`${STATIC_DATA_PATH}/mens/team-offensive-efficiency.json`),
          fetch(`${STATIC_DATA_PATH}/womens/team-offensive-efficiency.json`),
          fetch(`${STATIC_DATA_PATH}/mens/play-types.json`),
          fetch(`${STATIC_DATA_PATH}/womens/play-types.json`)
        ]);

        if (!mensRes.ok || !womensRes.ok) {
          throw new Error("Static data not found. Run: python backend/fetch_and_cache.py");
        }

        const [mensData, womensData, mensPlayTypes, womensPlayTypes] = await Promise.all([
          mensRes.json(),
          womensRes.json(),
          mensPlayTypesRes.json(),
          womensPlayTypesRes.json()
        ]);

        // Store all data
        setAllData({
          mens: { 
            stats: mensData, 
            playTypes: mensPlayTypes.play_types || [] 
          },
          womens: { 
            stats: womensData, 
            playTypes: womensPlayTypes.play_types || [] 
          }
        });

        // Set initial data for current gender
        setData(mensData.data || []);
        setAvailablePlayTypes(mensPlayTypes.play_types || []);
        setLastUpdated(mensData.fetched_at);
        
      } catch (err) {
        console.error("Failed to load static data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStaticData();
  }, []);

  // Update displayed data when gender changes
  useEffect(() => {
    if (allData[gender]) {
      const genderData = allData[gender];
      setAvailablePlayTypes(genderData.playTypes || []);
      setLastUpdated(genderData.stats?.fetched_at);
      
      // Apply filters to the data
      applyFilters(genderData.stats?.data || []);
    }
  }, [gender, allData]);

  // Apply filters when they change
  useEffect(() => {
    if (allData[gender]?.stats?.data) {
      applyFilters(allData[gender].stats.data);
    }
  }, [selectedPlayTypes, includePercentiles, gender, allData]);

  const applyFilters = (sourceData) => {
    let filtered = [...sourceData];
    
    // Filter by play types
    if (selectedPlayTypes.length > 0) {
      filtered = filtered.filter(row => 
        selectedPlayTypes.includes(row.PLAY_TYPE)
      );
    }
    
    setData(filtered);
  };

  const togglePlayType = (playType) => {
    setSelectedPlayTypes(prev => 
      prev.includes(playType) 
        ? prev.filter(pt => pt !== playType)
        : [...prev, playType]
    );
  };

  const clearFilters = () => {
    setSelectedPlayTypes([]);
    setIncludePercentiles(true);
  };

  // Format number for display
  const formatValue = (value, key) => {
    if (value === null || value === undefined) return "—";
    if (typeof value === "number") {
      if (key.includes("PPP") || key.includes("PERCENTILE")) {
        return value.toFixed(2);
      }
      if (key.includes("%")) {
        return value.toFixed(1) + "%";
      }
      return value.toLocaleString();
    }
    return value;
  };

  // Format last updated date
  const formatLastUpdated = (isoString) => {
    if (!isoString) return null;
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  // Get columns to display
  const getDisplayColumns = () => {
    if (data.length === 0) return [];
    const allKeys = Object.keys(data[0]);
    
    // Define column order
    const baseColumns = ["PLAY_TYPE", "TEAM", "PPP", "2PA", "2PM", "2P%", "3PA", "3PM", "3P%", "PLAY_COUNT"];
    const percentileColumns = ["PPP_PERCENTILE", "2P%_PERCENTILE", "3P%_PERCENTILE"];
    
    if (includePercentiles) {
      return [...baseColumns, ...percentileColumns].filter(col => allKeys.includes(col));
    }
    return baseColumns.filter(col => allKeys.includes(col));
  };

  return (
    <section className="relative py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-orange-400/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Team Offensive Efficiency</h2>
              <p className="text-slate-400 text-sm">Play-by-play efficiency statistics</p>
            </div>
          </div>

          {/* Gender Toggle */}
          <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setGender("mens")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                gender === "mens" 
                  ? "bg-orange-500 text-white shadow-lg" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Men's
            </button>
            <button
              onClick={() => setGender("womens")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                gender === "womens" 
                  ? "bg-orange-500 text-white shadow-lg" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Women's
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="mb-6 bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex flex-wrap items-center gap-4">
            {/* Percentiles Toggle */}
            <button
              onClick={() => setIncludePercentiles(!includePercentiles)}
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
            >
              {includePercentiles ? (
                <ToggleRight className="w-5 h-5 text-orange-500" />
              ) : (
                <ToggleLeft className="w-5 h-5 text-slate-500" />
              )}
              <span>Show Percentiles</span>
            </button>

            {/* Filter Dropdown */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-600 transition-all"
            >
              <Filter className="w-4 h-4" />
              <span>Play Types</span>
              {selectedPlayTypes.length > 0 && (
                <span className="bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {selectedPlayTypes.length}
                </span>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>

            {/* Clear Filters */}
            {(selectedPlayTypes.length > 0 || !includePercentiles) && (
              <button
                onClick={clearFilters}
                className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
              >
                Clear filters
              </button>
            )}

            {/* Last Updated */}
            {lastUpdated && (
              <div className="ml-auto flex items-center gap-2 text-xs text-slate-500">
                <RefreshCw className="w-3 h-3" />
                <span>Updated: {formatLastUpdated(lastUpdated)}</span>
              </div>
            )}
          </div>

          {/* Play Type Pills */}
          {showFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              {availablePlayTypes.map((pt) => (
                <button
                  key={pt}
                  onClick={() => togglePlayType(pt)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedPlayTypes.includes(pt)
                      ? "bg-orange-500 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  {pt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Data Table */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
              <span className="ml-3 text-slate-400">Loading statistics...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-400 mb-2">{error}</p>
              <p className="text-slate-500 text-sm">
                Run this command to fetch data:
              </p>
              <code className="block mt-2 bg-slate-700 px-4 py-2 rounded text-orange-400 text-sm">
                cd backend && python fetch_and_cache.py
              </code>
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              No data found for the selected filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-900/50">
                    {getDisplayColumns().map((col) => (
                      <th
                        key={col}
                        className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap"
                      >
                        {col.replace(/_/g, " ")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {data.map((row, idx) => (
                    <tr 
                      key={idx} 
                      className="hover:bg-slate-700/30 transition-colors"
                    >
                      {getDisplayColumns().map((col) => (
                        <td
                          key={col}
                          className={`px-4 py-3 whitespace-nowrap ${
                            col === "TEAM" || col === "PLAY_TYPE"
                              ? "text-white font-medium"
                              : col.includes("PERCENTILE")
                              ? "text-orange-400"
                              : "text-slate-300"
                          }`}
                        >
                          {formatValue(row[col], col)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Row count */}
        {!loading && !error && data.length > 0 && (
          <div className="mt-4 text-right text-sm text-slate-500">
            Showing {data.length} results
          </div>
        )}
      </div>
    </section>
  );
}
