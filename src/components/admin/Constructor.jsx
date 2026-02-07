import React, { useRef, useState } from 'react';
import { Stage, Layer, Circle, Text, Group, Rect, Transformer } from 'react-konva';
import AddZoneModal from './AddZoneModal';

const Constructor = ({ onSave, backgroundImage }) => {
    const [zones, setZones] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedZoneId, setSelectedZoneId] = useState(null);
    const transformerRef = useRef(null);

    const addZone = (zoneConfig) => {
        const newZone = {
            ...zoneConfig,
            id: Date.now(),
        };
        setZones([...zones, newZone]);
        setShowAddModal(false);
    };

    const handleSave = () => {
        // Generate seat positions from zones
        const schema = {
            zones: zones.map(zone => ({
                name: zone.name,
                type: zone.type,
                rows: zone.rows,
                cols: zone.cols,
                rowLabel: zone.rowLabel,
                startRowIndex: zone.startRowIndex,
                startSeatIndex: zone.startSeatIndex,
                price: zone.price,
                positions: generatePositions(zone)
            }))
        };
        onSave(schema);
    };

    const generatePositions = (zone) => {
        const positions = [];
        const spacing = 20;
        const baseX = zone.x || 100;
        const baseY = zone.y || 100;

        for (let r = 0; r < zone.rows; r++) {
            for (let c = 0; c < zone.cols; c++) {
                positions.push({
                    x: baseX + c * spacing,
                    y: baseY + r * spacing
                });
            }
        }
        return positions;
    };

    const ZoneGroup = ({ zone, isSelected, onSelect, onChange }) => {
        const groupRef = useRef(null);
        const [isDragging, setIsDragging] = useState(false);

        React.useEffect(() => {
            if (isSelected && transformerRef.current && groupRef.current) {
                transformerRef.current.nodes([groupRef.current]);
                transformerRef.current.getLayer().batchDraw();
            }
        }, [isSelected]);

        const spacing = 20;
        const seats = [];

        for (let r = 0; r < zone.rows; r++) {
            for (let c = 0; c < zone.cols; c++) {
                seats.push({
                    x: c * spacing,
                    y: r * spacing,
                    label: `${zone.rowLabel}${zone.startRowIndex + r}-${zone.startSeatIndex + c}`
                });
            }
        }

        const radius = zone.type === 'standing' ? 3 : zone.type === 'vip' ? 7 : 5;

        return (
            <Group
                ref={groupRef}
                x={zone.x}
                y={zone.y}
                rotation={zone.rotation || 0}
                scaleX={zone.scale || 1}
                scaleY={zone.scale || 1}
                draggable
                onClick={() => onSelect()}
                onTap={() => onSelect()}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(e) => {
                    setIsDragging(false);
                    onChange({
                        ...zone,
                        x: e.target.x(),
                        y: e.target.y()
                    });
                }}
                onTransformEnd={(e) => {
                    const node = groupRef.current;
                    onChange({
                        ...zone,
                        x: node.x(),
                        y: node.y(),
                        rotation: node.rotation(),
                        scale: node.scaleX()
                    });
                }}
            >
                {/* Zone background */}
                <Rect
                    x={-10}
                    y={-25}
                    width={zone.cols * spacing + 20}
                    height={zone.rows * spacing + 30}
                    fill={isDragging ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.1)'}
                    stroke="#8B5CF6"
                    strokeWidth={isSelected ? 2 : 1}
                    cornerRadius={8}
                />

                {/* Zone label */}
                <Text
                    x={0}
                    y={-20}
                    text={zone.name}
                    fontSize={12}
                    fill="#8B5CF6"
                    fontStyle="bold"
                />

                {/* Seats */}
                {seats.map((seat, idx) => (
                    <Circle
                        key={idx}
                        x={seat.x}
                        y={seat.y}
                        radius={radius}
                        fill="#FFF"
                        stroke="#8B5CF6"
                        strokeWidth={1}
                    />
                ))}
            </Group>
        );
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Seat Constructor</h2>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="btn-primary"
                    >
                        Add Seat Group
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={zones.length === 0}
                        className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Save & Continue
                    </button>
                </div>
            </div>

            <div className="card">
                <Stage width={900} height={600}>
                    <Layer>
                        {/* Background indicator */}
                        <Rect
                            x={0}
                            y={0}
                            width={900}
                            height={600}
                            fill="#1F2937"
                        />

                        {/* Stage label */}
                        <Text
                            x={0}
                            y={20}
                            width={900}
                            text="STAGE / SCREEN"
                            fontSize={20}
                            fontStyle="bold"
                            fill="#8B5CF6"
                            align="center"
                        />

                        {/* Render zones */}
                        {zones.map((zone) => (
                            <ZoneGroup
                                key={zone.id}
                                zone={zone}
                                isSelected={zone.id === selectedZoneId}
                                onSelect={() => setSelectedZoneId(zone.id)}
                                onChange={(updatedZone) => {
                                    setZones(zones.map(z => z.id === zone.id ? updatedZone : z));
                                }}
                            />
                        ))}

                        {/* Transformer for selected zone */}
                        {selectedZoneId && (
                            <Transformer
                                ref={transformerRef}
                                boundBoxFunc={(oldBox, newBox) => {
                                    // Limit resize
                                    if (newBox.width < 50 || newBox.height < 50) {
                                        return oldBox;
                                    }
                                    return newBox;
                                }}
                            />
                        )}
                    </Layer>
                </Stage>

                <div className="mt-4 text-sm text-white/70">
                    <p>• Click a zone to select it</p>
                    <p>• Drag zones to reposition</p>
                    <p>• Use handles to rotate and scale</p>
                    <p>• {zones.length} zone{zones.length !== 1 ? 's' : ''} created</p>
                </div>
            </div>

            {showAddModal && (
                <AddZoneModal
                    onClose={() => setShowAddModal(false)}
                    onConfirm={addZone}
                />
            )}
        </div>
    );
};

export default Constructor;
