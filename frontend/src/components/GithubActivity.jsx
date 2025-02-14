import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import { format, subDays, parseISO } from "date-fns";
import { Loader2 } from "lucide-react";

const GithubActivity = ({ username = "adlard07" }) => {
  const [commitData, setCommitData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const svgRef = useRef();

  // Clear SVG on component unmount
  useEffect(() => {
    return () => {
      if (svgRef.current) {
        d3.select(svgRef.current).selectAll("*").remove();
      }
    };
  }, []);

  useEffect(() => {
    const fetchCommitActivity = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://api.github.com/users/${username}/repos`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch repos: ${response.statusText}`);
        }

        const repos = await response.json();
        let commits = [];

        // Use Promise.all for parallel requests
        const commitPromises = repos.map(async (repo) => {
          try {
            const commitUrl = `https://api.github.com/repos/${username}/${repo.name}/stats/commit_activity`;
            const commitResponse = await fetch(commitUrl);
            
            if (!commitResponse.ok) return [];
            
            const weeklyCommits = await commitResponse.json();
            return weeklyCommits.map((week) => ({
              date: format(new Date(week.week * 1000), "yyyy-MM-dd"),
              count: week.total
            }));
          } catch (error) {
            console.warn(`Error fetching commits for ${repo.name}:`, error);
            return [];
          }
        });

        const commitResults = await Promise.all(commitPromises);
        commits = commitResults.flat();

        // Aggregate commits by date
        const aggregatedData = commits.reduce((acc, { date, count }) => {
          acc[date] = (acc[date] || 0) + count;
          return acc;
        }, {});

        const formattedData = Object.entries(aggregatedData).map(
          ([date, count]) => ({ date, count })
        );

        setCommitData(formattedData);
      } catch (error) {
        console.error("Error fetching commit activity:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommitActivity();
  }, [username]);

  useEffect(() => {
    if (commitData.length === 0 || loading || error) return;

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 20, left: 30 };
    const width = 800 - margin.left - margin.right;
    const height = 120 - margin.top - margin.bottom;
    const cellSize = 10;
    const cellPadding = 2;
    
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const dataMap = new Map(commitData.map((d) => [d.date, d.count]));

    const today = new Date();
    const startDate = subDays(today, 365);
    const dayFormat = d3.timeFormat("%Y-%m-%d");
    const days = d3.timeDays(startDate, today);

    // Color scale
    const colorScale = d3.scaleQuantize()
      .domain([0, d3.max(Array.from(dataMap.values()))])
      .range([
        "#1c1c1c", // No commits
        "#1a392a", // 1-2 commits
        "#2d503d", // 3-4 commits
        "#397d54", // 5-7 commits
        "#4CAF50"  // 8+ commits
      ]);

    // Create cells
    const cells = svg
      .selectAll("rect")
      .data(days)
      .enter()
      .append("rect")
      .attr("x", (d, i) => Math.floor(i / 7) * (cellSize + cellPadding))
      .attr("y", (d, i) => (i % 7) * (cellSize + cellPadding))
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("rx", 2)
      .attr("ry", 2)
      .style("fill", (d) => {
        const count = dataMap.get(dayFormat(d)) || 0;
        return colorScale(count);
      })
      .style("stroke", "#2d2d2d")
      .style("stroke-width", 1);

    // Add tooltips
    cells.append("title")
      .text((d) => {
        const date = dayFormat(d);
        const count = dataMap.get(date) || 0;
        return `${format(d, 'MMM d, yyyy')}: ${count} commit${count !== 1 ? 's' : ''}`;
      });

    // Add month labels
    const months = d3.timeMonths(startDate, today);
    svg.selectAll(".month")
      .data(months)
      .enter()
      .append("text")
      .attr("class", "month-label")
      .attr("x", (d, i) => i * (width / 12))
      .attr("y", -5)
      .attr("fill", "#8b8b8b")
      .style("font-size", "10px")
      .text(d => format(d, 'MMM'));

  }, [commitData, loading, error]);

  if (loading) {
    return (
      <div className="p-4 bg-gray-900 rounded-lg shadow-md min-h-[180px] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-gray-900 rounded-lg shadow-md min-h-[180px] flex flex-col items-center justify-center text-red-400">
        <p className="text-sm">Error loading GitHub activity</p>
        <p className="text-xs mt-1 text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">GitHub Contributions</h2>
        <span className="text-sm text-gray-400">@{username}</span>
      </div>
      <svg 
        ref={svgRef}
        className="w-full overflow-visible"
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

export default GithubActivity;