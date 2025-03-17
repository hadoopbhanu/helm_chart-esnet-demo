
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface Settings {
  nodeCount: number;
  connectionDistance: number;
  nodeSpeed: number;
  pulseSpeed: number;
}

interface NeuralControlsProps {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const NeuralControls = ({ settings, updateSettings }: NeuralControlsProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-neural-green mb-4">Visualization Controls</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="node-count" className="text-neural-blue">Neuron Count: {settings.nodeCount}</Label>
          </div>
          <Slider
            id="node-count"
            min={20}
            max={200}
            step={5}
            value={[settings.nodeCount]}
            onValueChange={(value) => updateSettings({ nodeCount: value[0] })}
            className="neural-slider"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="connection-distance" className="text-neural-blue">Connection Range: {settings.connectionDistance}px</Label>
          </div>
          <Slider
            id="connection-distance"
            min={50}
            max={300}
            step={10}
            value={[settings.connectionDistance]}
            onValueChange={(value) => updateSettings({ connectionDistance: value[0] })}
            className="neural-slider"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="node-speed" className="text-neural-blue">Neuron Speed: {settings.nodeSpeed.toFixed(1)}</Label>
          </div>
          <Slider
            id="node-speed"
            min={0.1}
            max={1.0}
            step={0.1}
            value={[settings.nodeSpeed]}
            onValueChange={(value) => updateSettings({ nodeSpeed: value[0] })}
            className="neural-slider"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="pulse-speed" className="text-neural-blue">Pulse Speed: {settings.pulseSpeed.toFixed(1)}</Label>
          </div>
          <Slider
            id="pulse-speed"
            min={0.5}
            max={5}
            step={0.5}
            value={[settings.pulseSpeed]}
            onValueChange={(value) => updateSettings({ pulseSpeed: value[0] })}
            className="neural-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default NeuralControls;
