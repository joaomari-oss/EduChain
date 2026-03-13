/* ══════════════════════════════════════════════════
   EduChain — Chart.js Initializations
   ══════════════════════════════════════════════════ */

(function () {
  'use strict';

  if (typeof Chart === 'undefined') return;

  Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
  Chart.defaults.color = '#64748b';

  /* ── 1. Frequência & Risco — Linha dupla ──────── */
  var trendCtx = document.getElementById('attendanceTrendChart');
  if (trendCtx) {
    new Chart(trendCtx, {
      type: 'line',
      data: {
        labels: ['Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez','Jan','Fev'],
        datasets: [
          {
            label: 'Frequência (%)',
            data: [91, 90, 89, 88, 85, 86, 84, 83, 82, 81, 80, 78],
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37,99,235,.08)',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#2563eb',
            yAxisID: 'yLeft'
          },
          {
            label: 'Risco Médio/Alto (%)',
            data: [8, 9, 10, 11, 14, 13, 15, 16, 17, 18, 20, 22],
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239,68,68,.06)',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#ef4444',
            borderDash: [4, 4],
            yAxisID: 'yRight'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'top',
            labels: { usePointStyle: true, pointStyleWidth: 10, boxHeight: 5 }
          },
          tooltip: { backgroundColor: '#1e293b', padding: 10, cornerRadius: 6 }
        },
        scales: {
          yLeft: {
            type: 'linear', position: 'left',
            min: 70, max: 100,
            grid: { color: '#f1f5f9' },
            ticks: { callback: function (v) { return v + '%'; }, stepSize: 5 }
          },
          yRight: {
            type: 'linear', position: 'right',
            min: 0, max: 30,
            grid: { drawOnChartArea: false },
            ticks: { callback: function (v) { return v + '%'; }, stepSize: 5 }
          },
          x: { grid: { display: false } }
        }
      }
    });
  }

  /* ── 2. Distribuição de Risco — Rosca ─────────── */
  var donutCtx = document.getElementById('riskDonutChart');
  if (donutCtx) {
    new Chart(donutCtx, {
      type: 'doughnut',
      data: {
        labels: ['Risco Baixo', 'Risco Médio', 'Alto Risco'],
        datasets: [{
          data: [1956, 749, 142],
          backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
          borderWidth: 0,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { usePointStyle: true, pointStyleWidth: 10, boxHeight: 5, padding: 16 }
          },
          tooltip: {
            backgroundColor: '#1e293b', padding: 10, cornerRadius: 6,
            callbacks: {
              label: function (ctx) {
                var total = ctx.dataset.data.reduce(function (a, b) { return a + b; }, 0);
                var pct = ((ctx.raw / total) * 100).toFixed(1);
                return ' ' + ctx.raw.toLocaleString('pt-BR') + ' alunos (' + pct + '%)';
              }
            }
          }
        }
      }
    });
  }

  /* ── 3. Frequência por Unidade — Barras ───────── */
  var barCtx = document.getElementById('unitBarChart');
  if (barCtx) {
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['EE São Paulo','EE Dom Pedro','EE Tiradentes','EE Santos Dumont','EE Caxingui','EE Ibirapuera'],
        datasets: [{
          label: 'Frequência Média (%)',
          data: [91, 87, 84, 82, 78, 73],
          backgroundColor: ['#2563eb','#10b981','#10b981','#f59e0b','#f59e0b','#ef4444'],
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1e293b', padding: 10, cornerRadius: 6,
            callbacks: { label: function (ctx) { return ' ' + ctx.raw + '%'; } }
          }
        },
        scales: {
          x: {
            min: 60, max: 100,
            grid: { color: '#f1f5f9' },
            ticks: { callback: function (v) { return v + '%'; } }
          },
          y: { grid: { display: false } }
        }
      }
    });
  }

}());
