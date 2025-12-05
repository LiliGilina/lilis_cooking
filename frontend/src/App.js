import React, { useState, useEffect } from 'react';
import { RefreshCcw, Loader2, AlertTriangle, CookingPot } from 'lucide-react';

// URL към вашия FastAPI ендпойнт (смятаме, че е конфигуриран с CORS)
const API_URL = 'http://localhost:8000/recepies';

// Адаптивен React компонент за показване на рецепти
const App = () => {
  const [recipes, setRecipes] = useState(null); // Съхранява извлечените рецепти
  const [loading, setLoading] = useState(false); // Указва дали зареждаме
  const [error, setError] = useState(null); // Съхранява грешка при извличане

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);
    setRecipes(null); // Изчистваме предишното състояние
    
    try {
      // Имитация на мрежова заявка с експоненциален отстъп (Exponential Backoff)
      const maxRetries = 3;
      let response = null;
      let lastError = null;

      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          response = await fetch(API_URL);
          if (response.ok) {
            break; // Успешна заявка, излизаме от цикъла
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        } catch (e) {
          lastError = e;
          if (attempt < maxRetries - 1) {
            const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
      }
      
      if (!response || !response.ok) {
        throw new Error(`Failed to fetch recipes after ${maxRetries} attempts: ${lastError.message}`);
      }
      
      const data = await response.json();
      
      // Предполагаме, че API-то връща речник с рецепти.
      // Тъй като не знаем точната структура, проверяваме дали съществува ключ 'recipe_count'
      // или ако е директно речникът с рецепти от предишния отговор.
      
      // Ако API-то връща директно данните:
      if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        // Проверяваме дали данните съдържат директно рецептите
        const recipeData = data.recipe_count ? data : data; 
        
        // В реално приложение, ще се уверим, че структурата е правилната, 
        // например преобразувайки обекта в масив за лесно итериране.
        
        // В момента API-то връща: {"recipe_count": 5, "status": "OK"}
        // Използваме само примерни данни, тъй като реалните рецепти не се връщат
        // от простия /recipes ендпойнт.
        
        const placeholderRecipes = {
            "Салата Капрезе": { title: "Салата Капрезе", ingredients: ["Домати", "Моцарела", "Босилек"], instructions: "Наредете ги." },
            "Пилешко Къри": { title: "Пилешко Къри", ingredients: ["Пиле", "Къри паста", "Кокосово мляко"], instructions: "Сгответе." },
        };

        // Заменяме с плейсхолдър данните за показване, докато API-то не е готово
        if (data.status === 'OK' && data.recipe_count) {
             setRecipes(placeholderRecipes);
        } else {
             setRecipes(data); // Ако API-то върне директно рецептите
        }


      } else {
        setRecipes({});
        setError("API-то не върна валидни данни за рецепти.");
      }

    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message || "Грешка при свързване с API на localhost:8000. Уверете се, че сървърът работи и CORS е конфигуриран правилно.");
    } finally {
      setLoading(false);
    }
  };

  // Извличане на рецептите при първоначално зареждане
  useEffect(() => {
    fetchRecipes();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center p-8 bg-white/50 rounded-lg shadow-inner">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-600 mr-3" />
          <p className="text-lg font-medium text-gray-700">Зареждане на рецепти...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center p-8 bg-red-100 border-l-4 border-red-500 rounded-lg shadow-lg">
          <AlertTriangle className="w-8 h-8 text-red-600 mb-3" />
          <h3 className="text-xl font-bold text-red-800 mb-2">Грешка при зареждане</h3>
          <p className="text-red-700 text-center">{error}</p>
        </div>
      );
    }

    if (!recipes || Object.keys(recipes).length === 0) {
      return (
        <div className="text-center p-8 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-yellow-800 mb-2">Няма намерени рецепти</h3>
          <p className="text-yellow-700">Проверете дали API ендпойнтът връща правилна структура.</p>
        </div>
      );
    }

    // Ако имаме рецепти, ги изобразяваме
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(recipes).map(([key, recipe]) => (
          <div 
            key={key} 
            className="bg-white p-6 rounded-xl shadow-2xl transition duration-300 hover:shadow-indigo-300/50 transform hover:scale-[1.02] border border-gray-100"
          >
            <h2 className="text-2xl font-extrabold text-indigo-700 mb-3 border-b pb-2 border-indigo-100 flex items-center">
                <CookingPot className="w-5 h-5 mr-2 text-indigo-500"/>
                {recipe.title || key}
            </h2>
            
            <div className="mb-4">
              <h4 className="text-md font-semibold text-gray-600 mb-1">Необходими продукти:</h4>
              <ul className="list-disc list-inside text-gray-700 ml-2 space-y-1">
                {recipe.ingredients && Array.isArray(recipe.ingredients) ? (
                    recipe.ingredients.map((item, index) => (
                        <li key={index} className="text-sm">{item}</li>
                    ))
                ) : (
                    <li className="text-sm italic text-gray-500">Няма информация за продуктите.</li>
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-md font-semibold text-gray-600 mb-1">Начин на приготвяне:</h4>
              <p className="text-gray-800 text-sm leading-relaxed bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                {recipe.instructions || "Няма информация за инструкциите."}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-2">
          Каталог с Рецепти
        </h1>
        <p className="text-lg text-gray-500">
          Заредени от локалния FastAPI сървър на 
          <code className="bg-gray-200 p-1 rounded font-mono text-sm">http://localhost:8000</code>
        </p>
      </header>

      <section className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-6">
            <button 
                onClick={fetchRecipes} 
                disabled={loading}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 disabled:bg-gray-400"
            >
                <RefreshCcw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Обновяване...' : 'Обнови Рецептите'}
            </button>
        </div>
        
        {/* Рендиране на съдържанието (зареждане, грешка или рецепти) */}
        {renderContent()}
      </section>

      <footer className="text-center mt-12 text-gray-400 text-sm">
        <p>Разработено с React и Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;