const INPUT = document.getElementById('input');
const RESULTADO = document.getElementById('resultado');

function result() {
    const originalString = INPUT.value;
    
    if (originalString.trim().length === 0) {
        RESULTADO.textContent = "";
        return;
    }

    // 1. Очищаем оригинальный текст от акцентов (á, é...)
    const normalizedString = originalString.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // 2. Собираем массив только из ЧИСТЫХ БУКВ в нижнем регистре (без пробелов и знаков)
    let lettersOnly = [];
    for (let i = 0; i < normalizedString.length; i++) {
        if (/[a-zA-Z0-9ñÑ]/.test(normalizedString[i])) {
            lettersOnly.push(normalizedString[i].toLowerCase());
        }
    }

    // 3. ЦИКЛ FOR: Разворачиваем только этот чистый массив букв
    let reversedLetters = [];
    for (let i = lettersOnly.length - 1; i >= 0; i--) {
        reversedLetters.push(lettersOnly[i]);
    }

    // 4. Накладываем перевернутые буквы на сетку пробелов оригинальной фразы
    let revesString = "";
    let letterIndex = 0;

    for (let i = 0; i < originalString.length; i++) {
        // Если в оригинале на этом месте стоял пробел или знак препинания
        if (!/[a-zA-Z0-9ñÑ]/.test(normalizedString[i])) {
            revesString += originalString[i]; // сохраняем исходный символ (пробел, запятую)
        } else {
            // Иначе ставим чистую перевернутую маленькую букву
            revesString += reversedLetters[letterIndex];
            letterIndex++;
        }    
    }

    // 5. КРАСИВЫЙ РЕГИСТР: Делаем заглавной ТОЛЬКО самую первую букву всей готовой фразы
    if (revesString.length > 0) {
        revesString = revesString.charAt(0).toUpperCase() + revesString.slice(1);
    }

    // 6. ОЧИСТКА ДЛЯ ЛОГИЧЕСКОЙ ПРОВЕРКИ НА ПАЛИНДРОМ
    let cleanOriginal = originalString.toLowerCase().normalize("NFD").replace(/[^a-z0-9ñ]/g, "");
    let cleanReves = revesString.toLowerCase().normalize("NFD").replace(/[^a-z0-9ñ]/g, "");

    const isSuccess = cleanOriginal === cleanReves;
    const isNumber = /^\d+$/.test(cleanOriginal);
    
    let verdict = "";
    if (isSuccess) {
        verdict = isNumber ? "¡Es un capicúa!" : "¡Es un palíndromo!";
    } else {
        verdict = isNumber ? "No es un capicúa." : "No es un palíndromo.";
    }

    const textColor = isSuccess ? "text-emerald-300" : "text-rose-300";

    // 7. ВЫВОД НА ЭКРАН
    RESULTADO.innerHTML = `
        <div class="p-4 bg-cyan-900/60 rounded-lg border border-cyan-800 text-left text-base md:text-xl w-full box-border">
            <div class="mb-1"><strong>Original:</strong> <span class="text-white">${originalString}</span></div>
            <div class="mb-1"><strong>Al revés:</strong> <span class="text-cyan-200">${revesString}</span></div>
            <div class="font-bold ${textColor} mt-3 tracking-wide text-lg md:text-2xl">${verdict}</div>
        </div>
    `;

    INPUT.value = "";
    INPUT.focus();
}