// meta-work-questionnaire.js

// Load D3.js
document.addEventListener('DOMContentLoaded', function() {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js';
    script.onload = initializeQuestionnaire;
    document.head.appendChild(script);
});

function getRecommendations(scores) {
    let sortedScores = scores.sort((a, b) => a.score - b.score);
    let lowestCategory = sortedScores[0].category;
    let secondLowestCategory = sortedScores[1].category;

    const programRecommendations = {
        'Metawork Skills & Concepts': {
            course: "'Foundations of Metawork' - A 12-week online course covering key metawork skills, concepts, and their practical applications in modern work environments.",
            experience: "'Metawork Immersion Workshop' - A 3-day intensive experience to deepen your understanding and application of metawork principles through collaborative exercises and real-world simulations.",
            journey: "'Metawork Mastery Program' - A 6-month guided journey to develop and integrate advanced metawork skills into your professional life, including monthly mentoring and peer learning circles.",
            practiceSpace: "'Metawork Labs' - Weekly sessions to experiment with and refine your metawork skills in a supportive, collaborative environment."
        },
        'Exploring the Fractal': {
            course: "'Fractal Thinking in Organizations' - An 8-week course exploring how patterns repeat across individual, team, organizational, and societal levels, and how to leverage this understanding.",
            experience: "'Fractal Systems Mapping Retreat' - A 2-day offsite experience focused on visualizing and navigating the fractal nature of complex systems in your work and organization.",
            journey: "'Fractal Leadership Development' - A year-long program to cultivate your ability to effect change across multiple scales, with quarterly workshops and ongoing coaching.",
            practiceSpace: "'Fractal Analysis Circles' - Bi-weekly peer-to-peer sessions applying fractal thinking to real-world organizational challenges."
        },
        'Finding Purpose': {
            course: "'Purposeful Work Integration' - A 10-week course on discovering, articulating, and aligning your purpose with your professional life and organizational goals.",
            experience: "'Purpose Resonance Workshop' - An intensive 2-day workshop to uncover your core purpose and create strategies for living it through your work.",
            journey: "'Living Purpose at Work' - A 9-month journey including retreats, coaching, and practical assignments to fully embody your purpose in your career and organization.",
            practiceSpace: "'Purpose-Driven Project Lab' - Quarterly projects applying purpose-driven principles to actual workplace initiatives and challenges."
        },
        'Integral Journey': {
            course: "'Integral Professional Development' - A comprehensive 16-week course covering personal growth, interpersonal skills, systems thinking, and outcome-focused work within an integral framework.",
            experience: "'Integral Leadership Intensive' - A 5-day transformative experience to develop your capacity as an integral leader in complex environments.",
            journey: "'Integral Change Initiative' - An 18-month program to lead a significant change project in your organization using integral principles, supported by expert mentoring and peer learning.",
            practiceSpace: "'Integral Work Practice Circles' - Monthly sessions to practice and refine integral approaches to work and organizational challenges."
        },
        'Innovation Paths': {
            course: "'Catalyzing Innovation in Work' - A dynamic 8-week course on fostering innovation, managing complexity, leveraging feedback, and articulating impact in rapidly changing work environments.",
            experience: "'Future of Work Innovation Lab' - A 3-day hands-on workshop to enhance your ability to navigate, create, and lead innovation in evolving workplace paradigms.",
            journey: "'Innovation Leadership Odyssey' - A personalized 12-month journey to consistently upgrade your innovation toolkit and mindset, preparing you to guide others through transformative change.",
            practiceSpace: "'Innovation Incubator Circles' - Bi-weekly sessions to collaboratively explore, prototype, and refine innovative approaches to complex workplace challenges."
        }
    };

    const lowestRecs = programRecommendations[lowestCategory];
    const secondLowestRecs = programRecommendations[secondLowestCategory];

    return ` <div class="meta-work-recommendations">
        <h3>Your Meta Work Development Recommendations</h3>
        <p>Based on your Meta Work profile, we recommend focusing on improving your <strong>${lowestCategory}</strong> and <strong>${secondLowestCategory}</strong> areas. Here are some tailored recommendations:</p>

        <div class="recommendation-section">
            <h4>1. ${lowestCategory}</h4>
            <ul>
                <li><strong>Course:</strong> ${lowestRecs.course}</li>
                <li><strong>Experience:</strong> ${lowestRecs.experience}</li>
                <li><strong>Journey:</strong> ${lowestRecs.journey}</li>
            </ul>
        </div>

        <div class="recommendation-section">
            <h4>2. ${secondLowestCategory}</h4>
            <ul>
                <li><strong>Course:</strong> ${secondLowestRecs.course}</li>
                <li><strong>Practice Space:</strong> ${secondLowestRecs.practiceSpace}</li>
            </ul>
        </div>

        <p class="suggestion"><strong>Our Suggestion:</strong> Start with the <em>${lowestCategory}</em> course and complement it with the <em>${secondLowestCategory}</em> practice space. As you progress, consider engaging in the more immersive journey or experience options to deepen your growth in these areas.</p>

        <p class="coaching-recommendation">Additionally, scheduling a personalized Meta Work coaching session could help you develop a comprehensive growth strategy that integrates these recommendations with your specific professional context and aspirations. This personalized approach will ensure you're leveraging these learning opportunities to their fullest potential in your unique work environment.</p>
    </div>`;
}

function getInterpretation(score) {
    if (score >= 4.5) return "Exceptional";
    if (score >= 4) return "Very Strong";
    if (score >= 3.5) return "Strong";
    if (score >= 3) return "Moderate";
    if (score >= 2.5) return "Developing";
    if (score >= 2) return "Emerging";
    return "Foundational";
}

function validateForm() {
    const form = document.getElementById('metaWorkQuestionnaire');
    const questions = form.querySelectorAll('.question');
    let isValid = true;

    questions.forEach((question, index) => {
        const radios = question.querySelectorAll('input[type="radio"]:checked');
        if (radios.length === 0) {
            isValid = false;
            question.style.backgroundColor = '#ffeeee';
        } else {
            question.style.backgroundColor = 'transparent';
        }
    });

    if (!isValid) {
        alert('Please answer all questions before submitting.');
    }

    return isValid;
}

function handleError(error) {
    console.error('An error occurred:', error);
    document.getElementById('loadingIndicator').style.display = 'none';
    document.getElementById('spiderChart').innerHTML = '<p>An error occurred while generating your profile. Please try again later.</p>';
}


function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) return;
    document.getElementById('loadingIndicator').style.display = 'block';
    document.getElementById('spiderChart').innerHTML = '';
    document.getElementById('scores').innerHTML = '';
    
    // Simulate a delay (remove this in production)
    setTimeout(() => {
        const formData = new FormData(event.target);
        const scores = processScores(formData);
        generateSpiderChart(scores);
        document.getElementById('loadingIndicator').style.display = 'none';
    }, 1000);
}

function initializeQuestionnaire() {
    const form = document.getElementById('metaWorkQuestionnaire');
    form.addEventListener('submit', handleSubmit);
}

function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const scores = processScores(formData);
    generateSpiderChart(scores);
}

function processScores(formData) {
    const categories = ['Topics & Domains', 'Exploring the Fractal', 'Finding Purpose', 'Integral Journey', 'Innovation Paths'];
    const scores = categories.map(category => ({
        category,
        score: calculateCategoryScore(formData, category)
    }));
    return scores;
}

function calculateCategoryScore(formData, category) {
    const categoryQuestions = {
        'Topics & Domains': [1, 2, 3, 4, 5],
        'Exploring the Fractal': [6, 7, 8, 9],
        'Finding Purpose': [10, 11, 12],
        'Integral Journey': [13, 14, 15, 16],
        'Innovation Paths': [17, 18, 19, 20]
    };

    const questions = categoryQuestions[category];
    const sum = questions.reduce((acc, q) => acc + parseInt(formData.get(`q${q}`), 10), 0);
    return sum / questions.length;
}

function generateSpiderChart(scores) {
    try {
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = 500 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;

    d3.select("#spiderChart").select("svg").remove();

    const svg = d3.select("#spiderChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`);

    const angleSlice = Math.PI * 2 / scores.length;

    const rScale = d3.scaleLinear()
        .range([0, radius])
        .domain([0, 5]);

    const axisGrid = svg.append("g").attr("class", "axisWrapper");

    axisGrid.selectAll(".levels")
        .data(d3.range(1, 6).reverse())
        .enter()
        .append("circle")
        .attr("class", "gridCircle")
        .attr("r", d => radius / 5 * d)
        .style("fill", "#CDCDCD")
        .style("stroke", "#CDCDCD")
        .style("fill-opacity", 0.1);

    const axis = axisGrid.selectAll(".axis")
        .data(scores)
        .enter()
        .append("g")
        .attr("class", "axis");

    axis.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", (d, i) => rScale(5) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y2", (d, i) => rScale(5) * Math.sin(angleSlice * i - Math.PI / 2))
        .attr("class", "line")
        .style("stroke", "white")
        .style("stroke-width", "2px");

    axis.append("text")
        .attr("class", "legend")
        .style("font-size", "11px")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("x", (d, i) => rScale(5.5) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y", (d, i) => rScale(5.5) * Math.sin(angleSlice * i - Math.PI / 2))
        .text(d => d.category);

    const radarLine = d3.lineRadial()
        .curve(d3.curveLinearClosed)
        .radius(d => rScale(d.score))
        .angle((d, i) => i * angleSlice);

    svg.selectAll(".radarArea")
        .data([scores])
        .enter()
        .append("path")
        .attr("class", "radarArea")
        .attr("d", radarLine)
        .style("fill", "#4e79a7")
        .style("fill-opacity", 0.7);

    svg.selectAll(".radarCircle")
        .data(scores)
        .enter()
        .append("circle")
        .attr("class", "radarCircle")
        .attr("r", 4)
        .attr("cx", (d, i) => rScale(d.score) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("cy", (d, i) => rScale(d.score) * Math.sin(angleSlice * i - Math.PI / 2))
        .style("fill", "#4e79a7");

    displayScores(scores);
     } catch (error) {
        handleError(error);
    }
}

function displayScores(scores) {
    const scoresDiv = document.getElementById('scores');
    scoresDiv.innerHTML = '<h3>Your Meta Work Profile:</h3>';
    
    const categories = [
        { name: 'Topics & Domains', description: 'Understanding of work purpose, relationships, perspectives, mastery, and energy management.' },
        { name: 'Exploring the Fractal', description: 'Self-awareness, team dynamics, organizational understanding, and societal impact.' },
        { name: 'Finding Purpose', description: 'Alignment of personal values with work, sense of purpose, and work-life integration.' },
        { name: 'Integral Journey', description: 'Personal growth, workplace relationships, system navigation, and measurable outcomes.' },
        { name: 'Innovation Paths', description: 'Openness to new ideas, handling complexity, seeking feedback, and articulating work impact.' }
    ];

    let overallScore = 0;
    let htmlContent = '<ul>';

    scores.forEach((score, index) => {
        const category = categories[index];
        overallScore += score.score;
        const interpretation = getInterpretation(score.score);
        htmlContent += `
            <li>
                <strong>${category.name}:</strong> ${score.score.toFixed(2)} - ${interpretation}
                <br><em>${category.description}</em>
                <br><strong>Insight:</strong> ${getInsight(category.name, score.score)}
            </li>`;
    });

    htmlContent += '</ul>';
    overallScore = overallScore / scores.length;

    scoresDiv.innerHTML += `
        <p><strong>Overall Score:</strong> ${overallScore.toFixed(2)} - ${getInterpretation(overallScore)}</p>
        ${htmlContent}
        <h4>Next Steps:</h4>
        <p>${getRecommendations(scores)}</p>`;
}

function getInterpretation(score) {
    if (score >= 4.5) return "Exceptional";
    if (score >= 4) return "Very Strong";
    if (score >= 3.5) return "Strong";
    if (score >= 3) return "Moderate";
    if (score >= 2.5) return "Developing";
    if (score >= 2) return "Emerging";
    return "Foundational";
}

function getInsight(category, score) {
    switch (category) {
        case 'Topics & Domains':
            if (score < 3) return "Consider exploring ways to deepen your understanding of work purpose and improve workplace relationships.";
            if (score < 4) return "You have a good grasp of work fundamentals. Focus on refining your mastery and energy management.";
            return "Your understanding of work domains is strong. Consider mentoring others or exploring advanced concepts in this area.";

        case 'Exploring the Fractal':
            if (score < 3) return "Work on developing your self-awareness and understanding of organizational structures.";
            if (score < 4) return "You have a solid foundation. Focus on improving your contribution to team dynamics and broader societal impact.";
            return "Your grasp of various work dimensions is excellent. Consider how you can leverage this to drive organizational change.";

        case 'Finding Purpose':
            if (score < 3) return "Reflect on how you can better align your personal values with your work and find more meaning in daily tasks.";
            if (score < 4) return "You're on the right track. Focus on deepening the integration between your work life and personal values.";
            return "Your work is well-aligned with your purpose. Consider how you can inspire others to find similar alignment.";

        case 'Integral Journey':
            if (score < 3) return "Focus on your personal growth and developing stronger workplace relationships.";
            if (score < 4) return "You're making good progress. Work on improving your understanding of organizational systems and achieving more measurable outcomes.";
            return "Your integral approach to work is commendable. Consider how you can foster this holistic view in your wider organization.";

        case 'Innovation Paths':
            if (score < 3) return "Work on being more open to new ideas and improving your ability to handle complexity in your work.";
            if (score < 4) return "You're adaptable and reflective. Focus on articulating your work's impact more clearly and seeking constructive feedback.";
            return "Your additional skills are strong. Look for opportunities to apply these skills in innovative ways to drive positive change.";

        default:
            return "Reflect on how you can strengthen this aspect of your Meta Work profile.";
    }
}
