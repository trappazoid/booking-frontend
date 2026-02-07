import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Stage, Layer, Circle, Text, Group } from 'react-konva';
import { useLanguage } from '../../contexts/LanguageContext';

const SeatMap = ({ seats, venueSchema, onSeatClick }) => {
    const { t } = useLanguage();
    const stageRef = useRef(null);
    const [stageSize, setStageSize] = useState({ width: 1000, height: 600 });
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Calculate stage dimensions
    useEffect(() => {
        const updateSize = () => {
            const container = stageRef.current?.container();
            if (container) {
                const width = container.offsetWidth || 1000;
                setStageSize({ width, height: 600 });
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    // Get seat status color
    const getSeatColor = (status) => {
        switch (status) {
            case 'available':
                return '#9CA3AF'; // Gray
            case 'cart':
                return '#EF4444'; // Red
            case 'booked':
                return '#10B981'; // Green
            default:
                return '#9CA3AF';
        }
    };

    // Get seat radius based on type
    const getSeatRadius = (type) => {
        switch (type) {
            case 'vip':
                return 8;
            case 'sitting':
                return 6;
            case 'standing':
                return 4;
            default:
                return 6;
        }
    };

    // Zoom handler
    const handleWheel = (e) => {
        e.evt.preventDefault();

        const scaleBy = 1.1;
        const stage = e.target.getStage();
        const oldScale = stage.scaleX();
        const pointer = stage.getPointerPosition();

        const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        };

        const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

        // Limit zoom
        const limitedScale = Math.max(0.5, Math.min(3, newScale));

        setScale(limitedScale);
        setPosition({
            x: pointer.x - mousePointTo.x * limitedScale,
            y: pointer.y - mousePointTo.y * limitedScale,
        });
    };

    // Memoize seat groups by status to minimize re-renders
    const seatGroups = useMemo(() => {
        const available = [];
        const cart = [];
        const booked = [];

        seats.forEach((seat) => {
            const seatData = {
                id: seat.id,
                x: seat.position_x || 0,
                y: seat.position_y || 0,
                radius: getSeatRadius(seat.seat_type),
                color: getSeatColor(seat.status),
                label: `${seat.row_label}${seat.seat_number}`,
                status: seat.status,
            };

            if (seat.status === 'available') {
                available.push(seatData);
            } else if (seat.status === 'cart') {
                cart.push(seatData);
            } else if (seat.status === 'booked') {
                booked.push(seatData);
            }
        });

        return { available, cart, booked };
    }, [seats]);

    // Handle seat click
    const handleSeatClickInternal = (seatId, status) => {
        if (status === 'available' && onSeatClick) {
            onSeatClick(seatId);
        }
    };

    return (
        <div className="relative w-full bg-gray-100 dark:bg-zinc-950 rounded-lg overflow-hidden border border-orange-500/20">
            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <button
                    onClick={() => {
                        const newScale = Math.min(3, scale * 1.2);
                        setScale(newScale);
                    }}
                    className="bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 text-orange-400 font-bold py-2 px-3 rounded border border-orange-500/30 transition-all"
                    title={t('zoom_in')}
                >
                    +
                </button>
                <button
                    onClick={() => {
                        const newScale = Math.max(0.5, scale / 1.2);
                        setScale(newScale);
                    }}
                    className="bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 text-orange-400 font-bold py-2 px-3 rounded border border-orange-500/30 transition-all"
                    title={t('zoom_out')}
                >
                    −
                </button>
                <button
                    onClick={() => {
                        setScale(1);
                        setPosition({ x: 0, y: 0 });
                    }}
                    className="bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 text-orange-400 text-xs font-bold py-2 px-3 rounded border border-orange-500/30 transition-all"
                    title={t('reset_view')}
                >
                    ⟲
                </button>
            </div>

            {/* Canvas */}
            <Stage
                ref={stageRef}
                width={stageSize.width}
                height={stageSize.height}
                scaleX={scale}
                scaleY={scale}
                x={position.x}
                y={position.y}
                onWheel={handleWheel}
                draggable
                onDragEnd={(e) => {
                    setPosition({
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                style={{ cursor: 'grab' }}
            >
                {/* Stage/Screen indicator */}
                <Layer>
                    <Group>
                        <Text
                            x={stageSize.width / 2 - 50}
                            y={20}
                            text={t('stage')}
                            fontSize={24}
                            fill="#F97316"
                            fontStyle="bold"
                        />
                    </Group>
                </Layer>

                {/* OPTIMIZED: Booked seats layer (static, non-interactive) */}
                <Layer listening={false}>
                    {seatGroups.booked.map((seat) => (
                        <Circle
                            key={`booked-${seat.id}`}
                            x={seat.x}
                            y={seat.y}
                            radius={seat.radius}
                            fill={seat.color}
                            perfectDrawEnabled={false}
                            shadowForStrokeEnabled={false}
                        />
                    ))}
                </Layer>

                {/* OPTIMIZED: Cart seats layer (semi-interactive) */}
                <Layer>
                    {seatGroups.cart.map((seat) => (
                        <Circle
                            key={`cart-${seat.id}`}
                            x={seat.x}
                            y={seat.y}
                            radius={seat.radius}
                            fill={seat.color}
                            perfectDrawEnabled={false}
                            shadowForStrokeEnabled={false}
                            listening={false}
                        />
                    ))}
                </Layer>

                {/* OPTIMIZED: Available seats layer (fully interactive) */}
                <Layer>
                    {seatGroups.available.map((seat) => (
                        <Circle
                            key={`available-${seat.id}`}
                            x={seat.x}
                            y={seat.y}
                            radius={seat.radius}
                            fill={seat.color}
                            onClick={() => handleSeatClickInternal(seat.id, seat.status)}
                            onTap={() => handleSeatClickInternal(seat.id, seat.status)}
                            onMouseEnter={(e) => {
                                const container = e.target.getStage().container();
                                container.style.cursor = 'pointer';
                                e.target.fill('#D1D5DB');
                                e.target.radius(seat.radius * 1.3);
                            }}
                            onMouseLeave={(e) => {
                                const container = e.target.getStage().container();
                                container.style.cursor = 'grab';
                                e.target.fill(seat.color);
                                e.target.radius(seat.radius);
                            }}
                            perfectDrawEnabled={false}
                            shadowForStrokeEnabled={false}
                        />
                    ))}
                </Layer>

                {/* Labels layer (only visible when zoomed in) */}
                {scale > 1.5 && (
                    <Layer listening={false}>
                        {seatGroups.available.slice(0, 200).map((seat) => (
                            <Text
                                key={`label-${seat.id}`}
                                x={seat.x - 10}
                                y={seat.y - 5}
                                text={seat.label}
                                fontSize={8}
                                fill="#FFFFFF"
                                perfectDrawEnabled={false}
                            />
                        ))}
                    </Layer>
                )}
            </Stage>

            {/* Instructions */}
            <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-gray-800 dark:text-white/70 text-xs px-3 py-2 rounded border border-orange-500/20">
                <p>{t('seat_map_instructions')}</p>
            </div>
        </div>
    );
};

export default SeatMap;
