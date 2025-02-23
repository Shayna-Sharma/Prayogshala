function App() {
    const [currentReaction, setCurrentReaction] = React.useState(reactions[0]);

    const handleReactionChange = (reactionId) => {
        try {
            const reaction = reactions.find(r => r.id === reactionId);
            if (!reaction) {
                throw new Error(`Reaction with id ${reactionId} not found`);
            }
            setCurrentReaction(reaction);
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div data-name="app" className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 data-name="title" className="text-3xl font-bold text-center mb-8">
                    Chemical Reaction Visualization
                </h1>

                <div data-name="reaction-selector" className="mb-8 text-center">
                    <select
                        data-name="reaction-select"
                        className="px-4 py-2 border rounded-lg"
                        onChange={(e) => handleReactionChange(Number(e.target.value))}
                        value={currentReaction.id}
                    >
                        {reactions.map(reaction => (
                            <option key={reaction.id} value={reaction.id}>
                                {reaction.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div data-name="reaction-visualization" className="reaction-container p-8">
                    <div className="flex justify-center items-center space-x-8">
                        <div data-name="reactants" className="flex space-x-4">
                            {currentReaction.reactantChemicals.map((chemical, index) => (
                                <div key={index} className="text-center">
                                    <Beaker chemical={chemical} />
                                    <p className="mt-2 font-mono">{chemical.name}</p>
                                </div>
                            ))}
                        </div>

                        <ReactionArrow />

                        <div data-name="products" className="flex space-x-4">
                            {currentReaction.productChemicals.map((chemical, index) => (
                                <div key={index} className="text-center">
                                    <Beaker chemical={chemical} />
                                    <p className="mt-2 font-mono">{chemical.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <ReactionEquation reaction={currentReaction} />
                </div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div data-name="root">
        <App />
    </div>
);
