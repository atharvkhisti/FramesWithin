import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'

interface SliderControlProps {
  label: string
  value: number
  min?: number
  max?: number
  step?: number
  onChange: (value: number) => void
  displayValue?: string | number
}

export function SliderControl({ label, value, min = -100, max = 100, step = 1, onChange, displayValue }: SliderControlProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Label className="text-sm font-medium">{label}</Label>
        <span className="text-sm text-muted-foreground">{displayValue ?? value}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={v => onChange(v[0])}
        max={max}
        min={min}
        step={step}
      />
    </div>
  )
} 