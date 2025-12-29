'use client'

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from 'recharts'

// Color schemes
const COLORS = {
  purple: '#a855f7',
  cyan: '#06b6d4',
  pink: '#ec4899',
  blue: '#3b82f6',
  green: '#22c55e',
  orange: '#f97316',
  yellow: '#eab308',
  red: '#ef4444',
}

interface ChartTooltipProps {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium text-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

// Styled Area Chart for trends
interface TrendChartProps {
  data: Array<{ [key: string]: string | number }>
  dataKeys: Array<{ key: string; color: string; name: string }>
  xAxisKey: string
  height?: number
}

export function TrendAreaChart({ data, dataKeys, xAxisKey, height = 300 }: TrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          {dataKeys.map((dk) => (
            <linearGradient key={dk.key} id={`gradient-${dk.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={dk.color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={dk.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis 
          dataKey={xAxisKey} 
          stroke="#888" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          stroke="#888" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="circle"
        />
        {dataKeys.map((dk) => (
          <Area
            key={dk.key}
            type="monotone"
            dataKey={dk.key}
            name={dk.name}
            stroke={dk.color}
            strokeWidth={2}
            fill={`url(#gradient-${dk.key})`}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}

// Multi-line chart for comparisons
export function ComparisonLineChart({ data, dataKeys, xAxisKey, height = 300 }: TrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis 
          dataKey={xAxisKey} 
          stroke="#888" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          stroke="#888" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="circle"
        />
        {dataKeys.map((dk) => (
          <Line
            key={dk.key}
            type="monotone"
            dataKey={dk.key}
            name={dk.name}
            stroke={dk.color}
            strokeWidth={2}
            dot={{ fill: dk.color, strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

// Bar chart for categorical data
interface BarChartProps {
  data: Array<{ name: string; value: number; color?: string }>
  height?: number
  horizontal?: boolean
}

export function StatsBarChart({ data, height = 300, horizontal = false }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart 
        data={data} 
        layout={horizontal ? 'vertical' : 'horizontal'}
        margin={{ top: 10, right: 10, left: horizontal ? 60 : -20, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        {horizontal ? (
          <>
            <XAxis type="number" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis dataKey="name" type="category" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
          </>
        ) : (
          <>
            <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
          </>
        )}
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
        <Bar 
          dataKey="value" 
          radius={[4, 4, 0, 0]}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color || Object.values(COLORS)[index % Object.values(COLORS).length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

// Donut/Pie chart for distributions
interface PieChartProps {
  data: Array<{ name: string; value: number; color?: string }>
  height?: number
  innerRadius?: number
  showLabels?: boolean
}

export function DistributionPieChart({ data, height = 300, innerRadius = 60, showLabels = true }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={innerRadius + 40}
          paddingAngle={2}
          dataKey="value"
          label={showLabels ? ({ name, percent }: { name: string; percent?: number }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%` : undefined}
          labelLine={showLabels}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color || Object.values(COLORS)[index % Object.values(COLORS).length]}
              stroke="transparent"
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        {/* Center text */}
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
          <tspan x="50%" dy="-0.5em" className="fill-foreground text-2xl font-bold">
            {total}
          </tspan>
          <tspan x="50%" dy="1.5em" className="fill-muted-foreground text-sm">
            Total
          </tspan>
        </text>
      </PieChart>
    </ResponsiveContainer>
  )
}

// Radial progress chart
interface RadialProgressProps {
  value: number
  max: number
  label: string
  color?: string
  height?: number
}

export function RadialProgress({ value, max, label, color = COLORS.purple, height = 200 }: RadialProgressProps) {
  const percentage = (value / max) * 100
  const data = [
    { name: label, value: percentage, fill: color },
  ]

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadialBarChart 
        cx="50%" 
        cy="50%" 
        innerRadius="60%" 
        outerRadius="90%" 
        data={data}
        startAngle={180}
        endAngle={-180}
      >
        <RadialBar
          background={{ fill: 'rgba(255,255,255,0.1)' }}
          dataKey="value"
          cornerRadius={10}
        />
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
          <tspan x="50%" dy="-0.5em" className="fill-foreground text-xl font-bold">
            {value}/{max}
          </tspan>
          <tspan x="50%" dy="1.5em" className="fill-muted-foreground text-xs">
            {label}
          </tspan>
        </text>
      </RadialBarChart>
    </ResponsiveContainer>
  )
}

// Color distribution chart specifically for palette analysis
interface ColorBarProps {
  colors: string[]
  height?: number
}

export function ColorDistributionBar({ colors, height = 60 }: ColorBarProps) {
  const percentage = 100 / colors.length
  
  return (
    <div className="w-full rounded-lg overflow-hidden" style={{ height }}>
      <div className="flex h-full">
        {colors.map((color, index) => (
          <div
            key={index}
            className="h-full transition-all hover:scale-y-110 cursor-pointer relative group"
            style={{ 
              backgroundColor: color, 
              width: `${percentage}%`,
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 flex items-center justify-center">
              <span className="text-white text-xs font-mono bg-black/50 px-2 py-1 rounded">
                {color}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// HSL Color wheel visualization
interface ColorWheelProps {
  hslValues: Array<{ h: number; s: number; l: number }>
  size?: number
}

export function ColorWheelVisualization({ hslValues, size = 200 }: ColorWheelProps) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Color wheel background */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, red, yellow, lime, aqua, blue, magenta, red)',
          opacity: 0.3,
        }}
      />
      {/* Inner circle */}
      <div 
        className="absolute inset-4 rounded-full bg-card border border-border"
      />
      {/* Color points */}
      {hslValues.map((hsl, index) => {
        const angle = (hsl.h - 90) * (Math.PI / 180) // Convert to radians, offset by 90
        const radius = (size / 2) * 0.7 // Position on the wheel
        const x = (size / 2) + Math.cos(angle) * radius
        const y = (size / 2) + Math.sin(angle) * radius
        
        return (
          <div
            key={index}
            className="absolute w-4 h-4 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: x,
              top: y,
              backgroundColor: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
            }}
          />
        )
      })}
    </div>
  )
}

// Sparkline for inline stats
interface SparklineProps {
  data: number[]
  color?: string
  width?: number
  height?: number
}

export function Sparkline({ data, color = COLORS.purple, width = 100, height = 30 }: SparklineProps) {
  const chartData = data.map((value, index) => ({ index, value }))
  
  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export { COLORS }
