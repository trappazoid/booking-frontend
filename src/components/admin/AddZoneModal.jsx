import React, { useState } from 'react';

const AddZoneModal = ({ onClose, onConfirm }) => {
    const [zoneName, setZoneName] = useState('');
    const [zoneType, setZoneType] = useState('sitting');
    const [rows, setRows] = useState(10);
    const [cols, setCols] = useState(15);
    const [rowLabel, setRowLabel] = useState('A');
    const [startRowIndex, setStartRowIndex] = useState(1);
    const [startSeatIndex, setStartSeatIndex] = useState(1);
    const [price, setPrice] = useState(50); // in dollars

    const totalSeats = rows * cols;

    const handleConfirm = () => {
        const zone = {
            name: zoneName,
            type: zoneType,
            rows,
            cols,
            rowLabel,
            startRowIndex,
            startSeatIndex,
            price: price * 100, // Convert to cents
            x: 100, // Default position
            y: 100,
            rotation: 0,
            scale: 1
        };
        onConfirm(zone);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="card max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Add Seat Zone</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Zone Name */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Zone Name</label>
                        <input
                            type="text"
                            value={zoneName}
                            onChange={(e) => setZoneName(e.target.value)}
                            className="input-field"
                            placeholder="e.g., VIP Center, Fan Zone"
                        />
                    </div>

                    {/* Zone Type */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Zone Type</label>
                        <select
                            value={zoneType}
                            onChange={(e) => setZoneType(e.target.value)}
                            className="input-field"
                        >
                            <option value="sitting">Sitting (Standard chair)</option>
                            <option value="vip">VIP (Larger, more expensive)</option>
                            <option value="standing">Standing (Dense dots)</option>
                        </select>
                    </div>

                    {/* Grid Configuration */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Rows</label>
                            <input
                                type="number"
                                value={rows}
                                onChange={(e) => setRows(Math.max(1, parseInt(e.target.value) || 1))}
                                className="input-field"
                                min="1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Columns</label>
                            <input
                                type="number"
                                value={cols}
                                onChange={(e) => setCols(Math.max(1, parseInt(e.target.value) || 1))}
                                className="input-field"
                                min="1"
                            />
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="p-4 rounded-lg bg-primary-500/10 border border-primary-500/30">
                        <p className="text-lg font-semibold text-primary-300">
                            Total seats: {totalSeats}
                        </p>
                        <p className="text-sm text-white/70 mt-1">
                            {rows} rows × {cols} columns
                        </p>
                    </div>

                    {/* Numbering Logic */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Row Label</label>
                        <input
                            type="text"
                            value={rowLabel}
                            onChange={(e) => setRowLabel(e.target.value)}
                            className="input-field"
                            placeholder="e.g., A, Sector 1"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Start Row Index</label>
                            <input
                                type="number"
                                value={startRowIndex}
                                onChange={(e) => setStartRowIndex(Math.max(1, parseInt(e.target.value) || 1))}
                                className="input-field"
                                min="1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Start Seat Index</label>
                            <input
                                type="number"
                                value={startSeatIndex}
                                onChange={(e) => setStartSeatIndex(Math.max(1, parseInt(e.target.value) || 1))}
                                className="input-field"
                                min="1"
                            />
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Price per Seat ($)</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Math.max(0, parseInt(e.target.value) || 0))}
                            className="input-field"
                            min="0"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                    <button onClick={onClose} className="flex-1 btn-secondary">
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!zoneName}
                        className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Confirm & Add Zone
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddZoneModal;
