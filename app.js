// ==========================================
// JS: A Tampa da Caixa (Apologética)
// Interatividade, Refutações e Quiz
// ========================================== 

document.addEventListener('DOMContentLoaded', () => {

    // 1. Lógica dos Botões de Refutação (Desafios Céticos)
    const setupRefutation = (btnId, textId, customLogic = null) => {
        const btn = document.getElementById(btnId);
        const text = document.getElementById(textId);

        if (btn && text) {
            btn.addEventListener('click', () => {
                if (customLogic) {
                    customLogic(btn, text);
                } else {
                    text.classList.toggle('hidden');
                    btn.textContent = text.classList.contains('hidden') ? 'Refutar Objeção' : 'Ocultar Resposta';
                }
            });
        }
    };

    // Objeção Lógica (Tática do Papa-Léguas)
    setupRefutation('btn-refute-logica', 'refute-logica-text', (btn, text) => {
        text.classList.remove('hidden');
        btn.style.display = 'none'; // A objeção se autodestrói!
    });

    // Objeção Cosmo
    setupRefutation('btn-refute-cosmo', 'refute-cosmo-text');

    // Objeção Vida (DNA)
    setupRefutation('btn-refute-vida', 'refute-vida-text');
    setupRefutation('btn-refute-biogenese', 'refute-biogenese-text');

    // Objeção Moral
    setupRefutation('btn-refute-moral', 'refute-moral-text');

    // Objeções Históricas (Tribunal)
    const gavelBtns = document.querySelectorAll('.gavel-btn');
    gavelBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            const refutationText = document.getElementById(targetId);
            if (refutationText) {
                refutationText.classList.toggle('hidden');
            }
        });
    });

    // 2. Sistema de Quiz de Cosmovisão
    const quizData = [
        {
            question: "1. Sobre a 'Verdade', afirmações como 'Não existe verdade absoluta' são:",
            options: [
                { text: "Logicamente perfeitas, tudo depende do ponto de vista.", score: { atheist: 1, pantheist: 0, theist: 0 } },
                { text: "Parte de uma ilusão cósmica onde o bem e o mal se fundem no Todo.", score: { atheist: 0, pantheist: 1, theist: 0 } },
                { text: "Autodestrutivas, pois essa frase tenta ser uma verdade absoluta.", score: { atheist: 0, pantheist: 0, theist: 1 } }
            ]
        },
        {
            question: "2. Se o Universo teve um início provado (Expansão, Termodinâmica), a sua causa mais provável é:",
            options: [
                { text: "Um acaso cego e forças materiais impessoais.", score: { atheist: 1, pantheist: 0, theist: 0 } },
                { text: "O universo sempre existiu em ciclos eternos e nós somos parte dele.", score: { atheist: 0, pantheist: 1, theist: 0 } },
                { text: "Uma causa não-espacial, atemporal e inimaginavelmente poderosa.", score: { atheist: 0, pantheist: 0, theist: 1 } }
            ]
        },
        {
            question: "3. O DNA contém informação complexa. Códigos como de software e linguagens geneticamente programadas...",
            options: [
                { text: "...são gerados por bilhões de anos de mutações e acaso (Cálculo de Borel).", score: { atheist: 1, pantheist: 0, theist: 0 } },
                { text: "...emanam apenas de uma Mente/Inteligência que planeja com antevidência.", score: { atheist: 0, pantheist: 0, theist: 1 } },
                { text: "...são reflexos da roda da vida, e tudo é uma coisa só.", score: { atheist: 0, pantheist: 1, theist: 0 } }
            ]
        },
        {
            question: "4. Quando nos indignamos genuinamente com injustiças cruéis (ex: Escravidão), isso indica que:",
            options: [
                { text: "Existe uma moralidade subjetiva baseada na sobrevivência do rebanho.", score: { atheist: 1, pantheist: 0, theist: 0 } },
                { text: "Existe um Padrão moral absoluto (uma Linha Reta) imposto por um Legislador Divino.", score: { atheist: 0, pantheist: 0, theist: 1 } },
                { text: "Julgar é uma ilusão, no final a luz e a escuridão são faces da mesma moeda.", score: { atheist: 0, pantheist: 1, theist: 0 } }
            ]
        }
    ];

    let currentQuestion = 0;
    let scores = { atheist: 0, pantheist: 0, theist: 0 };

    const quizScreens = document.getElementById('quiz-screens');

    const renderQuestion = () => {
        if (!quizScreens) return;

        if (currentQuestion >= quizData.length) {
            renderResult();
            return;
        }

        const q = quizData[currentQuestion];
        let optionsHtml = '';

        q.options.forEach((opt, index) => {
            optionsHtml += `<button class="quiz-option-btn" onclick="window.selectAnswer(${index})">${opt.text}</button>`;
        });

        quizScreens.innerHTML = `
            <h3 class="quiz-question-title">${q.question}</h3>
            <div class="quiz-options">
                ${optionsHtml}
            </div>
        `;
    };

    window.selectAnswer = (optionIndex) => {
        const q = quizData[currentQuestion];
        const selectedOpt = q.options[optionIndex];

        scores.atheist += selectedOpt.score.atheist;
        scores.pantheist += selectedOpt.score.pantheist;
        scores.theist += selectedOpt.score.theist;

        currentQuestion++;
        renderQuestion();
    };

    const renderResult = () => {
        let resultTitle = "";
        let resultBody = "";

        // Determinate Winner
        let maxScore = Math.max(scores.atheist, scores.pantheist, scores.theist);

        if (maxScore === scores.theist) {
            resultTitle = "Teísmo (Cristão)";
            resultBody = "Você tem um forte raciocínio lógico que te leva ao Teísmo. Você reconhece que para todo relógio há um relojoeiro, que morais objetivas exigem um Legislador e que fatos não se curvam a sentimentos. O túmulo vazio chama você a explorar quem verdadeiramente resolve o quebra-cabeça!";
        } else if (maxScore === scores.atheist) {
            resultTitle = "Naturalismo (Ateísmo)";
            resultBody = "A sua lente atual presume que a matéria e o tempo são tudo que existe. No entanto, lembre-se: afirmar que a vida veio do acaso cego exige confiar sua mente a processos químicos puramente irracionais. Onde há código (DNA), sempre existiu um Programador. Pense nisso!";
        } else {
            resultTitle = "Panteísmo / Relativismo";
            resultBody = "Você se inclina para a fusão de tudo no 'Um' impessoal, onde o bem e o mal se dissolvem. Porém, negar o mal absoluto deságua em tolerar coisas terríveis (pois no 'todo', Hitlers e Madres Teresas seriam iguais). Existe um Deus pessoal que se importa em separar a luz das trevas!";
        }

        quizScreens.innerHTML = `
            <div style="animation: fadeIn 0.8s ease">
                <h3 class="highlight">O seu Resultado: ${resultTitle}</h3>
                <p style="margin-top: 1rem; color: var(--lavender)">${resultBody}</p>
                <button class="cta-button" style="margin-top: 2rem;" onclick="location.href='#home'">Reiniciar a Jornada</button>
            </div>
        `;
    };

    // Initialize Quiz
    if (quizScreens) {
        renderQuestion();
    }
});
