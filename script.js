// ---------- Dados ----------
const allKpis = {
  "all": [85, 80, 65, 90],
  "Equipe A": [90, 85, 60, 95],
  "Equipe B": [75, 70, 70, 85]
};

const kpiLabels = ["Projetos Concluídos", "Prazos Cumpridos", "Orçamento Utilizado", "Satisfação do Cliente"];

const allTasks = [
  { name: "Planejamento", start: 0, duration: 30, team: "Equipe A", period: "Q1", color: "#4CAF50" },
  { name: "Execução", start: 30, duration: 50, team: "Equipe B", period: "Q1", color: "#2196F3" },
  { name: "Entrega", start: 80, duration: 20, team: "Equipe A", period: "Q1", color: "#FF9800" },
  { name: "Planejamento", start: 0, duration: 40, team: "Equipe B", period: "Q2", color: "#9C27B0" },
  { name: "Execução", start: 40, duration: 40, team: "Equipe A", period: "Q2", color: "#FFC107" },
  { name: "Entrega", start: 80, duration: 20, team: "Equipe B", period: "Q2", color: "#00BCD4" }
];

// ---------- Função para renderizar KPIs ----------
let kpiChart;
function renderKpiChart(team) {
  const data = allKpis[team] || allKpis["all"];
  const ctx = document.getElementById('kpiChart').getContext('2d');
  if (kpiChart) kpiChart.destroy();

  kpiChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: kpiLabels,
      datasets: [{
        label: 'Indicadores (%)',
        data: data,
        backgroundColor: ['#4CAF50','#2196F3','#FF9800','#9C27B0']
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, max: 100 } }
    }
  });
}

// ---------- Função para renderizar Gantt ----------
function renderGantt(teamFilter, periodFilter) {
  const ganttContainer = document.getElementById('gantt-container');
  ganttContainer.innerHTML = '';

  const filteredTasks = allTasks.filter(task =>
    (teamFilter === 'all' || task.team === teamFilter) &&
    (periodFilter === 'all' || task.period === periodFilter)
  );

  filteredTasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.style.width = task.duration + '%';
    taskDiv.style.marginLeft = task.start + '%';
    taskDiv.style.backgroundColor = task.color;
    taskDiv.textContent = `${task.name} (${task.duration}%)`;
    ganttContainer.appendChild(taskDiv);
  });
}

// ---------- Inicialização ----------
function updateDashboard() {
  const team = document.getElementById('teamSelect').value;
  const period = document.getElementById('periodSelect').value;
  renderKpiChart(team);
  renderGantt(team, period);
}

// ---------- Eventos ----------
document.getElementById('teamSelect').addEventListener('change', updateDashboard);
document.getElementById('periodSelect').addEventListener('change', updateDashboard);

// Render inicial
updateDashboard();
