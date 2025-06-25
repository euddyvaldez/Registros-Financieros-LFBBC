
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Rect, Line, Text as SvgText, Path, Circle, G } from 'react-native-svg';
import { AppTheme } from '../constants/theme';
import { ProcessedChartDataPoint, PieChartSegment } from '../types';
import { formatCurrency } from '../utils/helpers';


interface ChartProps {
  data: ProcessedChartDataPoint[];
  width: number;
  height: number;
  theme: AppTheme;
}
interface PieChartProps {
  data: PieChartSegment[];
  width: number;
  height: number;
  theme: AppTheme;
}

export const LineChart: React.FC<ChartProps> = ({ data, width, height, theme }) => {
  if (!data || data.length === 0) {
    return <Text style={{color: theme.colors.secondaryText}}>No data for Line Chart</Text>;
  }

  const margin = { top: 20, right: 20, bottom: 50, left: 70 }; // Adjusted for RN
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;

  const maxValue = Math.max(10, ...data.flatMap(d => [d.ingresos, d.gastos, d.inversion]));

  const getX = (index: number) => margin.left + (index / (data.length - 1 || 1)) * graphWidth;
  const getY = (value: number) => margin.top + graphHeight - (value / maxValue) * graphHeight;

  return (
    <View>
    <Svg width={width} height={height}>
      {/* X and Y Axis Lines */}
      <Line
        x1={margin.left} y1={margin.top + graphHeight}
        x2={margin.left + graphWidth} y2={margin.top + graphHeight}
        stroke={theme.colors.defaultLine} strokeWidth="1"
      />
      <Line
        x1={margin.left} y1={margin.top}
        x2={margin.left} y2={margin.top + graphHeight}
        stroke={theme.colors.defaultLine} strokeWidth="1"
      />

      {/* X-Axis Labels */}
      {data.map((d, i) => {
         if (data.length > 15 && i % Math.floor(data.length / (data.length > 30 ? 7 : 5)) !== 0 && i !== data.length -1 && i !== 0) return null;
        return (
            <SvgText
                key={`x-label-${i}`}
                x={getX(i)}
                y={margin.top + graphHeight + 20}
                fill={theme.colors.secondaryText}
                fontSize="10"
                textAnchor="middle"
            >
                {d.label}
            </SvgText>
        );
      })}

      {/* Y-Axis Labels and Ticks */}
      {[...Array(6)].map((_, i) => {
        const val = (maxValue / 5) * i;
        const yPos = getY(val);
        return (
          <G key={`y-tick-${i}`}>
            <Line
              x1={margin.left - 5} y1={yPos}
              x2={margin.left} y2={yPos}
              stroke={theme.colors.defaultLine} strokeWidth="0.5"
            />
            <SvgText
              x={margin.left - 10} y={yPos + 4}
              fill={theme.colors.secondaryText} fontSize="9" textAnchor="end"
            >
              {`RD$${Math.round(val)}`}
            </SvgText>
          </G>
        );
      })}

      {/* Data Lines and Points */}
      {(['ingresos', 'gastos', 'inversion'] as const).map(type => {
        if (data.every(d => d[type] === 0)) return null;
        const pathD = data.map((d, i) => 
            `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d[type])}`
        ).join(' ');

        return (
          <G key={`line-${type}`}>
            <Path d={pathD} stroke={theme.colors[type]} strokeWidth="2" fill="none" />
            {data.map((d, i) => (
              (d[type] > 0 || (d[type] === 0 && data.some(dp => dp[type] > 0))) &&
              <Circle
                key={`point-${type}-${i}`}
                cx={getX(i)} cy={getY(d[type])} r="3"
                fill={theme.colors[type]}
                stroke={theme.colors.card} // for contrast against line
                strokeWidth="1"
              />
            ))}
          </G>
        );
      })}
    </Svg>
    {/* Legend */}
     <View style={styles.legendContainer}>
        {(['ingresos', 'gastos', 'inversion'] as const).map(type => (
            !data.every(d => d[type] === 0) &&
            <View key={`legend-${type}`} style={styles.legendItem}>
                <View style={[styles.legendColorBox, { backgroundColor: theme.colors[type] }]} />
                <Text style={{color: theme.colors.text, fontSize: 12}}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
            </View>
        ))}
    </View>
    </View>
  );
};


export const BarChart: React.FC<ChartProps> = ({ data, width, height, theme }) => {
  if (!data || data.length === 0) {
    return <Text style={{color: theme.colors.secondaryText}}>No data for Bar Chart</Text>;
  }

  const margin = { top: 20, right: 20, bottom: 50, left: 70 };
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;

  const maxValue = Math.max(10, ...data.flatMap(d => [d.ingresos, d.gastos, d.inversion]));
  const getY = (value: number) => margin.top + graphHeight - (value / maxValue) * graphHeight;

  const numGroups = data.length;
  const groupWidth = graphWidth / numGroups;
  const barPadding = 0.2; // Percentage of groupWidth for padding between groups
  const barAreaWidth = groupWidth * (1 - barPadding);
  const numBarsPerGroup = 3; // Ingresos, Gastos, Inversion
  const barWidth = barAreaWidth / numBarsPerGroup;


  return (
    <View>
    <Svg width={width} height={height}>
       <Line x1={margin.left} y1={margin.top + graphHeight} x2={margin.left + graphWidth} y2={margin.top + graphHeight} stroke={theme.colors.defaultLine} strokeWidth="1" />
       <Line x1={margin.left} y1={margin.top} x2={margin.left} y2={margin.top + graphHeight} stroke={theme.colors.defaultLine} strokeWidth="1" />

        {data.map((d, i) => {
            const groupX = margin.left + (groupWidth * i) + (groupWidth * barPadding / 2);
            return (
                <G key={`group-${i}`}>
                    <SvgText x={groupX + barAreaWidth / 2} y={margin.top + graphHeight + 20} fill={theme.colors.secondaryText} fontSize="10" textAnchor="middle">
                        {d.label}
                    </SvgText>
                    {(['ingresos', 'gastos', 'inversion'] as const).map((type, barIndex) => {
                        if (d[type] > 0) {
                            const barX = groupX + (barWidth * barIndex);
                            const barH = graphHeight - (getY(d[type]) - margin.top);
                            return (
                                <Rect
                                    key={`bar-${type}-${i}`}
                                    x={barX}
                                    y={getY(d[type])}
                                    width={barWidth * 0.9} // Slight padding
                                    height={barH > 0 ? barH : 0}
                                    fill={theme.colors[type]}
                                />
                            );
                        }
                        return null;
                    })}
                </G>
            );
        })}
        {[...Array(6)].map((_, i) => {
            const val = (maxValue / 5) * i;
            const yPos = getY(val);
            return (
            <G key={`y-tick-bar-${i}`}>
                <Line x1={margin.left - 5} y1={yPos} x2={margin.left} y2={yPos} stroke={theme.colors.defaultLine} strokeWidth="0.5" />
                <SvgText x={margin.left - 10} y={yPos + 4} fill={theme.colors.secondaryText} fontSize="9" textAnchor="end">
                {`RD$${Math.round(val)}`}
                </SvgText>
            </G>
            );
      })}
    </Svg>
     <View style={styles.legendContainer}>
        {(['ingresos', 'gastos', 'inversion'] as const).map(type => (
            !data.every(d => d[type] === 0) &&
            <View key={`legend-bar-${type}`} style={styles.legendItem}>
                <View style={[styles.legendColorBox, { backgroundColor: theme.colors[type] }]} />
                <Text style={{color: theme.colors.text, fontSize: 12}}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
            </View>
        ))}
    </View>
    </View>
  );
};

export const PieChart: React.FC<PieChartProps> = ({ data, width, height, theme }) => {
  if (!data || data.length === 0 || data.every(s => s.value === 0)) {
    return <Text style={{color: theme.colors.secondaryText}}>No data for Pie Chart</Text>;
  }

  const radius = Math.min(width / 2.5, height / 2) * 0.8;
  const centerX = width / 2.5; // Adjusted for legend
  const centerY = height / 2;

  const totalValue = data.reduce((sum, segment) => sum + segment.value, 0);
  if (totalValue === 0) return <Text style={{color: theme.colors.secondaryText}}>No positive values for Pie Chart</Text>;

  let startAngle = -Math.PI / 2; // Start at 12 o'clock

  return (
    <View style={{alignItems: 'center'}}>
    <Svg width={width} height={height}>
      <G x={centerX} y={centerY}>
        {data.map((segment, index) => {
          if (segment.value <= 0) return null;

          const sliceAngle = (segment.value / totalValue) * 2 * Math.PI;
          const endAngle = startAngle + sliceAngle;

          const x1 = radius * Math.cos(startAngle);
          const y1 = radius * Math.sin(startAngle);
          const x2 = radius * Math.cos(endAngle);
          const y2 = radius * Math.sin(endAngle);

          const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

          const pathData = [
            `M 0 0`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            `Z`
          ].join(' ');
          
          startAngle = endAngle;

          return <Path key={`slice-${index}`} d={pathData} fill={segment.color} stroke={theme.colors.card} strokeWidth="1.5" />;
        })}
      </G>
    </Svg>
    <View style={[styles.legendContainer, styles.pieLegendContainer]}>
        {data.map((segment, index) => {
             if (segment.value <= 0) return null;
             const percentage = ((segment.value / totalValue) * 100).toFixed(1);
            return (
                <View key={`legend-pie-${index}`} style={styles.legendItem}>
                    <View style={[styles.legendColorBox, { backgroundColor: segment.color }]} />
                    <Text style={{color: theme.colors.text, fontSize: 11}}>
                        {`${segment.name}: ${percentage}% (${formatCurrency(segment.value)})`}
                    </Text>
                </View>
            );
        })}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
    legendContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 10,
        paddingHorizontal: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        marginBottom: 5,
    },
    legendColorBox: {
        width: 12,
        height: 12,
        borderRadius: 2,
        marginRight: 6,
    },
    pieLegendContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        paddingLeft: 20, // Align with typical chart margins
    }
});

// Implement BarChart and PieChart similarly
