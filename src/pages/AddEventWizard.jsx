import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { eventsAPI } from '../utils/api';
import Constructor from '../components/admin/Constructor';

const AddEventWizard = () => {
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [posterFile, setPosterFile] = useState(null);
    const [schematicFile, setSchematicFile] = useState(null);
    const [venueSchema, setVenueSchema] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { token, isAdmin } = useAuth();
    const navigate = useNavigate();

    // Redirect if not admin
    React.useEffect(() => {
        if (!isAdmin()) {
            navigate('/');
        }
    }, [isAdmin, navigate]);

    const handleNext = () => {
        if (step === 1 && (!title || !description || !date)) {
            setError('Пожалуйста, заполните все обязательные поля');
            return;
        }
        setError('');
        setStep(step + 1);
    };

    const handleBack = () => {
        setError('');
        setStep(step - 1);
    };

    const handleConstructorSave = (schema) => {
        setVenueSchema(schema);
        handleSubmit(schema);
    };

    const handleSubmit = async (schema) => {
        setLoading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('date', new Date(date).toISOString());
            formData.append('venue_schema', JSON.stringify(schema));
            formData.append('token', token);

            if (posterFile) {
                formData.append('poster', posterFile);
            }
            if (schematicFile) {
                formData.append('schematic', schematicFile);
            }

            await eventsAPI.createEvent(formData);
            alert('✓ Событие успешно создано!');
            navigate('/');
        } catch (err) {
            console.error('Ошибка создания события:', err);
            setError(err.response?.data?.detail || 'Не удалось создать событие');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    Добавить новое событие
                </h1>

                {/* Progress Indicator */}
                <div className="flex justify-center items-center mb-8">
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${step >= 1 ? 'bg-orange-500' : 'bg-gray-300 dark:bg-zinc-700'}`}>
                            1
                        </div>
                        <div className={`w-20 h-1 ${step >= 2 ? 'bg-orange-500' : 'bg-gray-300 dark:bg-zinc-700'}`} />
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${step >= 2 ? 'bg-orange-500' : 'bg-gray-300 dark:bg-zinc-700'}`}>
                            2
                        </div>
                        <div className={`w-20 h-1 ${step >= 3 ? 'bg-orange-500' : 'bg-gray-300 dark:bg-zinc-700'}`} />
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${step >= 3 ? 'bg-orange-500' : 'bg-gray-300 dark:bg-zinc-700'}`}>
                            3
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300">
                        {error}
                    </div>
                )}

                {/* Step 1: Basic Info */}
                {step === 1 && (
                    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-orange-500/20">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Основная информация</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Название события *</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-gray-100 dark:bg-zinc-800 border border-orange-500/30 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all"
                                    placeholder="например, Летний музыкальный фестиваль 2026"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Дата и время *</label>
                                <input
                                    type="datetime-local"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full bg-gray-100 dark:bg-zinc-800 border border-orange-500/30 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Описание *</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full bg-gray-100 dark:bg-zinc-800 border border-orange-500/30 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all resize-none"
                                    rows={6}
                                    placeholder="Подробно опишите событие..."
                                />
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                onClick={handleNext}
                                className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 hover:from-orange-600 hover:via-red-600 hover:to-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all"
                            >
                                Далее: Загрузка файлов →
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Upload Files */}
                {step === 2 && (
                    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-orange-500/20">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Загрузка файлов</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Постер события (опционально)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setPosterFile(e.target.files[0])}
                                    className="w-full bg-gray-100 dark:bg-zinc-800 border border-orange-500/30 rounded-lg px-4 py-3 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 dark:file:bg-orange-900 dark:file:text-orange-200 hover:file:bg-orange-100 dark:hover:file:bg-orange-800"
                                />
                                {posterFile && (
                                    <p className="text-sm text-green-400 mt-2">✓ {posterFile.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Схема зала (опционально)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setSchematicFile(e.target.files[0])}
                                    className="w-full bg-gray-100 dark:bg-zinc-800 border border-orange-500/30 rounded-lg px-4 py-3 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 dark:file:bg-orange-900 dark:file:text-orange-200 hover:file:bg-orange-100 dark:hover:file:bg-orange-800"
                                />
                                {schematicFile && (
                                    <p className="text-sm text-green-400 mt-2">✓ {schematicFile.name}</p>
                                )}
                                <p className="text-xs text-gray-600 dark:text-white/50 mt-2">
                                    Будет использовано в качестве фона в конструкторе
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between mt-6">
                            <button
                                onClick={handleBack}
                                className="bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-semibold py-3 px-6 rounded-lg border border-orange-500/30 transition-all"
                            >
                                ← Назад
                            </button>
                            <button
                                onClick={handleNext}
                                className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 hover:from-orange-600 hover:via-red-600 hover:to-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all"
                            >
                                Далее: Конструктор →
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Constructor */}
                {step === 3 && (
                    <div>
                        <div className="mb-4 flex justify-start">
                            <button
                                onClick={handleBack}
                                className="bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-semibold py-2 px-4 rounded-lg border border-orange-500/30 transition-all"
                            >
                                ← Назад
                            </button>
                        </div>
                        <Constructor
                            onSave={handleConstructorSave}
                            backgroundImage={schematicFile}
                        />
                    </div>
                )}

                {loading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                        <div className="bg-white dark:bg-zinc-900 rounded-xl p-8 border border-orange-500/30 text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
                            <p className="text-gray-900 dark:text-white">Создание события...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddEventWizard;
