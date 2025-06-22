

const initialRazonesData: { id: number; descripcion: string }[] = [
    { id: 1,  descripcion: "SEMANAL" },
    { id: 2,  descripcion: "MENSUALIDAD" },
    { id: 3,  descripcion: "APORTE EXTRA" },
    { id: 4,  descripcion: "NEVERITA" },
    { id: 5,  descripcion: "BOTELLON" },
    { id: 6,  descripcion: "AGUA" },
    { id: 7,  descripcion: "HIELO" },
    { id: 8,  descripcion: "MALLA" },
    { id: 9,  descripcion: "BOLA BASKET" },
    { id: 10, descripcion: "PITO (SILBATO)" },
    { id: 11, descripcion: "JARRON DE AGUA" },
    { id: 12, descripcion: "PITILLO" },
    { id: 13, descripcion: "VASO PLASTICOS" },
    { id: 14, descripcion: "MEDIDOR DE PRESION" },
    { id: 15, descripcion: "ARBITRO (PITO)" },
    { id: 16, descripcion: "TERMOS PERSONALIZADOS" },
    { id: 17, descripcion: "MEDALLAS" },
    { id: 18, descripcion: "TORNEO NAVIDEÑO 2023" },
    { id: 19, descripcion: "COMBUSTIBLE" },
    { id: 20, descripcion: "TERMO DE AGUA GRANDE" },
    { id: 21, descripcion: "SUAPE Y ESCOBA" },
    { id: 22, descripcion: "1ER UNIFORME REVERSIBLE SUBLIMADO" },
    { id: 23, descripcion: "MARCADORES (PARA LA PIZARRA)" },
    { id: 24, descripcion: "APP ESTADISTICAS (mensualidad)" },
    { id: 25, descripcion: "FORMULARIO ESTADISTICAS" },
    { id: 26, descripcion: "BOLETAS VOTACION CAPITANES" },
    { id: 27, descripcion: "DONACIONES" },
    { id: 28, descripcion: "ALQUILAR CANCHA" },
    { id: 29, descripcion: "TORNEO ANIVERSARIO 2024" },
    { id: 30, descripcion: "REFRIGERIO" },
    { id: 31, descripcion: "CRONOMETRO" },
    { id: 32, descripcion: "CORCHA (ESPONJA)" },
    { id: 33, descripcion: "FOGUEO" },
    { id: 34, descripcion: "FARDOS DE AGUA" },
    { id: 35, descripcion: "CERVEZAS ONE" },
    { id: 36, descripcion: "TRANSPORTE" },
    { id: 37, descripcion: "ACTIVIDAD FIN DE AÑO 2024" },
    { id: 38, descripcion: "INYECCION DE CAPITAL" },
    { id: 39, descripcion: "REPOSICION DE CAPITAL" },
    { id: 40, descripcion: "TORNEO ANIVERSARIO 2025" }
];

let razones: { id: number; descripcion: string }[] = [];
try {
    const storedRazones = localStorage.getItem('razonesData');
    if (storedRazones) {
        razones = JSON.parse(storedRazones);
    } else {
        razones = [...initialRazonesData.map(r => ({...r}))];
    }
} catch (e) {
    console.error("Error loading razones from localStorage", e);
    razones = [...initialRazonesData.map(r => ({...r}))];
}

let nextReasonId = razones.length > 0 ? Math.max(0, ...razones.map(r => r.id)) + 1 : 1;
let editingReasonId: number | null = null;
let newReasonInputText = '';
let editReasonInputText = '';
let razonesSearchTerm = '';
let razonesSortOrder: 'id_asc' | 'id_desc' | 'alpha_asc' | 'alpha_desc' = 'alpha_asc';


const initialIntegrantesData: { id: number; nombre: string }[] = [
    { id: 1, nombre: "LOS FORASTEROS" }, { id: 2, nombre: "INVITADOS" }, { id: 3, nombre: "EUDDY VALDEZ" },
    { id: 4, nombre: "WANDY VALDEZ" }, { id: 5, nombre: "ROLANDO VALDEZ" }, { id: 6, nombre: "ROANTONY VALDEZ" },
    { id: 7, nombre: "ROBERT FABIAN" }, { id: 8, nombre: "MICHAEL VALDEZ" }, { id: 9, nombre: "JUNIOR VALDEZ" },
    { id: 10, nombre: "ROBERTO" }, { id: 11, nombre: "FRANCISCO VALDEZ" }, { id: 12, nombre: "FRANCK VALDEZ" },
    { id: 13, nombre: "MAICOL DE LA CRUZ" }, { id: 14, nombre: "EDWIN BATISTA" }, { id: 15, nombre: "FRANCISCO LANTIGUA" },
    { id: 16, nombre: "ELIU RAVELO" }, { id: 17, nombre: "FÉLIX VALLEJO" }, { id: 18, nombre: "ALBHERT ABREU" },
    { id: 19, nombre: "JESE SANCHEZ" }, { id: 20, nombre: "GERALD TAVERAS" }, { id: 21, nombre: "BRAYDOL BRITO" },
    { id: 22, nombre: "SAMUEL FIGUEROA" }, { id: 23, nombre: "ALLENDY LOPEZ" }, { id: 24, nombre: "CARLOS DE LOS SANTOS" },
    { id: 25, nombre: "SIASVINKY SOSA" }, { id: 26, nombre: "HENRY CONCEPCION" }, { id: 27, nombre: "PIERO" },
    { id: 28, nombre: "OSWALDO" }, { id: 29, nombre: "WILKIN GARCÍAS" }, { id: 30, nombre: "MISAEL MEDRANO" },
    { id: 31, nombre: "HANSEL BREA" }, { id: 32, nombre: "CARMELO CAPELLÁN" }, { id: 33, nombre: "BENJAMIN FRANCISCO" },
    { id: 34, nombre: "FRANKELY VARGAS (Frandy)" }, { id: 35, nombre: "FRANKELY GUERRERO" }, { id: 36, nombre: "RAINIER SANTANA" },
    { id: 37, nombre: "BRIS" }, { id: 38, nombre: "BRAYLIN HERNANDEZ" }, { id: 39, nombre: "JOSE ANGEL EL BARON" },
    { id: 40, nombre: "DARWIN MICHELL" }, { id: 41, nombre: "ARIEL FIGUEROA" }, { id: 42, nombre: "LEBRON (JOSE LUIS)" },
    { id: 43, nombre: "WALO" }, { id: 44, nombre: "DARIEL" }, { id: 45, nombre: "DAINER" }, { id: 46, nombre: "FIDEL" },
    { id: 47, nombre: "ISMAEL - EL PERRO" }, { id: 48, nombre: "JOSTIN" }, { id: 49, nombre: "IVAN" },
    { id: 50, nombre: "CHINO" }, { id: 51, nombre: "ALEX" }, { id: 52, nombre: "KABRA" }, { id: 53, nombre: "RUSO" },
    { id: 54, nombre: "EIRCK" }, { id: 55, nombre: "NATHANAEL" }
];

let integrantes: { id: number; nombre: string }[] = [];
try {
    const storedIntegrantes = localStorage.getItem('integrantesData');
    if (storedIntegrantes) {
        integrantes = JSON.parse(storedIntegrantes);
    } else {
        integrantes = [...initialIntegrantesData.map(i => ({...i}))];
    }
} catch (e) {
    console.error("Error loading integrantes from localStorage", e);
    integrantes = [...initialIntegrantesData.map(i => ({...i}))];
}

let nextIntegranteId = integrantes.length > 0 ? Math.max(0, ...integrantes.map(i => i.id)) + 1 : 1;
let editingIntegranteId: number | null = null;
let newIntegranteInputText = '';
let editIntegranteInputText = '';
let integrantesSearchTerm = '';
let integrantesSortOrder: 'id_asc' | 'id_desc' | 'alpha_asc' | 'alpha_desc' = 'alpha_asc';

// --- Financial Records State ---
interface FinancialRecord {
    id: number;
    fecha: string; // YYYY-MM-DD
    integranteId: number;
    movimiento: 'INGRESOS' | 'GASTOS' | 'INVERSION';
    razonId: number;
    descripcion: string;
    monto: number;
}

let financialRecords: FinancialRecord[] = [];
try {
    const storedRecords = localStorage.getItem('financialRecords');
    if (storedRecords) {
        financialRecords = JSON.parse(storedRecords);
    }
} catch (e) {
    console.error("Error loading financial records from localStorage", e);
    financialRecords = [];
}

let nextRecordId: number = financialRecords.length > 0 ? Math.max(0, ...financialRecords.map(r => r.id)) + 1 : 1;


// Form input states for new financial records
let newRecordFecha: string = new Date().toISOString().split('T')[0];
let newRecordIntegranteId: number | null = null;
let newRecordMovimiento: 'INGRESOS' | 'GASTOS' | 'INVERSION' = 'INGRESOS';
let newRecordRazonId: number | null = null;
let newRecordDescripcion: string = '';
let newRecordMonto: string = '';

// For record form - new selection mechanism
let newRecordIntegranteSearchText: string = ''; 
let newRecordIntegranteSelectedName: string = ''; 
let newRecordRazonSearchText: string = '';       
let newRecordRazonSelectedDescripcion: string = '';

let focusTargetId: string | null = null;

// --- Dashboard Chart State (now for Financial Panel) ---
type DashboardViewType = 'annual_summary' | 'monthly_trend' | 'daily_trend';
let dashboardViewType: DashboardViewType = 'monthly_trend';
let dashboardSelectedYear: number | 'all_available' = 'all_available';
let dashboardSelectedMonth: number = new Date().getMonth() + 1; // 1-12, used for daily_trend


// --- End Financial Records State ---

let currentView = 'dashboard'; // 'dashboard', 'financial_panel', 'records', 'razones', or 'integrantes'

const appRoot = document.getElementById('app');
const RAZON_SEARCH_INPUT_ID = 'razon-search-input-field';
const INTEGRANTE_SEARCH_INPUT_ID = 'integrante-search-input-field';
const CSV_FILE_INPUT_ID = 'csv-file-input'; 
const RAZON_CSV_FILE_INPUT_ID = 'razon-csv-file-input';
const INTEGRANTE_CSV_FILE_INPUT_ID = 'integrante-csv-file-input';

const RECORD_INTEGRANTE_FILTER_INPUT_ID = 'record-integrante-filter-input';
const RECORD_RAZON_FILTER_INPUT_ID = 'record-razon-filter-input';


const ICONS = {
    edit: `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.754.754V13.5h.793l.754-.754zm2.122-2.122L1.5 12.172v-.293l1.854-1.854 2.122 2.122z"/>
        </svg>
    `,
    delete: `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>
    `,
    home: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
    `,
    people: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
    `,
    list: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
    `,
    chart: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 3v18h18"/>
            <path d="m18 9-5 5-4-4-3 3"/>
        </svg>
    `
};

function saveFinancialRecords() {
    try {
        localStorage.setItem('financialRecords', JSON.stringify(financialRecords));
    } catch (e) {
        console.error("Error saving financial records to localStorage", e);
        alert("Error: No se pudieron guardar los registros financieros. El almacenamiento local puede estar lleno o deshabilitado.");
    }
}

function saveRazonesToLocalStorage() {
    try {
        localStorage.setItem('razonesData', JSON.stringify(razones));
    } catch (e) {
        console.error("Error saving razones to localStorage", e);
        alert("Error: No se pudieron guardar las razones. El almacenamiento local puede estar lleno o deshabilitado.");
    }
}

function saveIntegrantesToLocalStorage() {
    try {
        localStorage.setItem('integrantesData', JSON.stringify(integrantes));
    } catch (e) {
        console.error("Error saving integrantes to localStorage", e);
        alert("Error: No se pudieron guardar los integrantes. El almacenamiento local puede estar lleno o deshabilitado.");
    }
}


function renderApp(): void {
    if (!appRoot) {
        console.error('App root not found');
        return;
    }
    appRoot.innerHTML = ''; 

    const mainContentElement = document.createElement('div');
    mainContentElement.id = 'main-content-area';

    if (currentView === 'dashboard') {
        renderDashboardScreen(mainContentElement);
    } else if (currentView === 'financial_panel') {
        renderFinancialPanelScreen(mainContentElement);
    } else if (currentView === 'records') {
        renderRecordsScreen(mainContentElement);
    } else if (currentView === 'razones') {
        renderRazonesScreen(mainContentElement);
    } else if (currentView === 'integrantes') {
        renderIntegrantesScreen(mainContentElement);
    }

    appRoot.appendChild(mainContentElement);
    renderBottomNavigation(appRoot);

    if (focusTargetId) {
        const elementToFocus = document.getElementById(focusTargetId);
        if (elementToFocus instanceof HTMLInputElement || elementToFocus instanceof HTMLTextAreaElement || elementToFocus instanceof HTMLSelectElement) {
            requestAnimationFrame(() => { 
                elementToFocus.focus();
                if (elementToFocus instanceof HTMLInputElement && typeof elementToFocus.value === 'string') {
                    try {
                        elementToFocus.setSelectionRange(elementToFocus.value.length, elementToFocus.value.length);
                    } catch (e) { /* ignore */ }
                }
            });
        }
        focusTargetId = null; 
    }
}

function renderBottomNavigation(parentElement: HTMLElement): void {
    const nav = document.createElement('nav');
    nav.className = 'bottom-nav';

    const navItems = [
        { view: 'dashboard', label: 'Inicio', icon: ICONS.home },
        { view: 'financial_panel', label: 'Panel Fin.', icon: ICONS.chart },
        { view: 'records', label: 'Registros', icon: ICONS.list },
        { view: 'integrantes', label: 'Integrantes', icon: ICONS.people },
        { view: 'razones', label: 'Razones', icon: ICONS.list }
    ];

    navItems.forEach(item => {
        const navItem = document.createElement('div');
        navItem.className = 'nav-item';
        if (currentView === item.view) {
            navItem.classList.add('active');
        }
        navItem.setAttribute('aria-label', item.label);
        navItem.setAttribute('role', 'button');
        navItem.tabIndex = 0;

        navItem.innerHTML = `
            ${item.icon}
            <span>${item.label}</span>
        `;

        navItem.onclick = () => {
            if (currentView === 'razones' && item.view !== 'razones') {
                editingReasonId = null;
                razonesSearchTerm = '';
                newReasonInputText = '';
                editReasonInputText = '';
            }
            if (currentView === 'integrantes' && item.view !== 'integrantes') {
                editingIntegranteId = null;
                integrantesSearchTerm = '';
                newIntegranteInputText = '';
                editIntegranteInputText = '';
            }
             if (currentView === 'records' && item.view !== 'records') {
                newRecordIntegranteSearchText = '';
                newRecordIntegranteSelectedName = '';
                newRecordRazonSearchText = '';
                newRecordRazonSelectedDescripcion = '';
            }
            currentView = item.view;
            renderApp();
        };
        navItem.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                navItem.click();
            }
        };
        nav.appendChild(navItem);
    });
    parentElement.appendChild(nav);
}

function getAvailableYearsForFilter(records: FinancialRecord[]): (number | 'all_available')[] {
    if (records.length === 0) return ['all_available', new Date().getFullYear()];
    const years = new Set(records.map(r => new Date(r.fecha).getFullYear()));
    return ['all_available', ...Array.from(years).sort((a,b) => b - a)];
}

const MONTH_NAMES_ES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

interface ProcessedChartDataPoint {
    label: string; 
    ingresos: number;
    gastos: number; // For chart, this will be Math.abs(gastos)
    inversion: number; // For chart, this will be Math.abs(inversion)
}

function getProcessedChartData(): ProcessedChartDataPoint[] {
    let recordsToProcess = financialRecords; 

    if (dashboardViewType === 'annual_summary') {
        const yearlyData: { [year: number]: ProcessedChartDataPoint } = {};
        recordsToProcess.forEach(r => {
            const year = new Date(r.fecha).getFullYear();
            if (!yearlyData[year]) {
                yearlyData[year] = { label: String(year), ingresos: 0, gastos: 0, inversion: 0 };
            }
            if (r.movimiento === 'INGRESOS') yearlyData[year].ingresos += r.monto;
            else if (r.movimiento === 'GASTOS') yearlyData[year].gastos += Math.abs(r.monto); 
            else if (r.movimiento === 'INVERSION') yearlyData[year].inversion += Math.abs(r.monto);
        });
        return Object.values(yearlyData).sort((a,b) => parseInt(a.label) - parseInt(b.label));
    }

    let yearToFilter: number | null = null;
    if (typeof dashboardSelectedYear === 'number') {
        yearToFilter = dashboardSelectedYear;
    }

    if (dashboardViewType === 'monthly_trend') {
        const monthlyData: { [month: number]: ProcessedChartDataPoint } = {};
         for (let i = 0; i < 12; i++) { 
            monthlyData[i] = { label: MONTH_NAMES_ES[i], ingresos: 0, gastos: 0, inversion: 0 };
        }

        recordsToProcess.forEach(r => {
            const recordDate = new Date(r.fecha);
            const recordYear = recordDate.getFullYear();
            const recordMonth = recordDate.getMonth(); 

            if (yearToFilter === null || recordYear === yearToFilter) { 
                if (r.movimiento === 'INGRESOS') monthlyData[recordMonth].ingresos += r.monto;
                else if (r.movimiento === 'GASTOS') monthlyData[recordMonth].gastos += Math.abs(r.monto); 
                else if (r.movimiento === 'INVERSION') monthlyData[recordMonth].inversion += Math.abs(r.monto);
            }
        });
        return Object.values(monthlyData); 
    }

    if (dashboardViewType === 'daily_trend') {
        if (yearToFilter === null) { 
            console.warn("Daily trend attempted without a specific year. Defaulting to current year.");
            yearToFilter = new Date().getFullYear(); 
        }
        
        const daysInMonth = new Date(yearToFilter, dashboardSelectedMonth, 0).getDate(); 
        const dailyData: { [day: number]: ProcessedChartDataPoint } = {};
        for (let i = 1; i <= daysInMonth; i++) {
            dailyData[i] = { label: String(i), ingresos: 0, gastos: 0, inversion: 0 };
        }

        recordsToProcess.forEach(r => {
            const recordDate = new Date(r.fecha);
            if (recordDate.getFullYear() === yearToFilter && (recordDate.getMonth() + 1) === dashboardSelectedMonth) {
                const day = recordDate.getDate();
                if (r.movimiento === 'INGRESOS') dailyData[day].ingresos += r.monto;
                else if (r.movimiento === 'GASTOS') dailyData[day].gastos += Math.abs(r.monto); 
                else if (r.movimiento === 'INVERSION') dailyData[day].inversion += Math.abs(r.monto);
            }
        });
        return Object.values(dailyData);
    }
    return [];
}


function renderTrendChartSVG(parentElement: HTMLElement, data: ProcessedChartDataPoint[]): void {
    parentElement.innerHTML = ''; 

    if (data.length === 0) {
        const noDataMsg = document.createElement('p');
        noDataMsg.textContent = 'No hay datos para el período y filtros seleccionados.';
        noDataMsg.className = 'no-data-message';
        parentElement.appendChild(noDataMsg);
        return;
    }

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    const chartWidth = 380;
    const chartHeight = 250;
    const margin = { top: 20, right: 20, bottom: 50, left: 70 }; 
    const graphWidth = chartWidth - margin.left - margin.right;
    const graphHeight = chartHeight - margin.top - margin.bottom;

    svg.setAttribute('viewBox', `0 0 ${chartWidth} ${chartHeight}`);
    svg.classList.add('trend-chart-svg');

    const maxValue = Math.max(10, ...data.flatMap(d => [d.ingresos, d.gastos, d.inversion])); 
    
    const xScale = (index: number) => margin.left + (index / (data.length -1 || 1)) * graphWidth;
    const yScale = (value: number) => margin.top + graphHeight - (value / maxValue) * graphHeight;

    const xAxis = document.createElementNS(svgNS, 'line');
    xAxis.setAttribute('x1', String(margin.left));
    xAxis.setAttribute('y1', String(margin.top + graphHeight));
    xAxis.setAttribute('x2', String(margin.left + graphWidth));
    xAxis.setAttribute('y2', String(margin.top + graphHeight));
    xAxis.classList.add('chart-axis');
    svg.appendChild(xAxis);

    const yAxis = document.createElementNS(svgNS, 'line');
    yAxis.setAttribute('x1', String(margin.left));
    yAxis.setAttribute('y1', String(margin.top));
    yAxis.setAttribute('x2', String(margin.left));
    yAxis.setAttribute('y2', String(margin.top + graphHeight));
    yAxis.classList.add('chart-axis');
    svg.appendChild(yAxis);

    data.forEach((d, i) => {
        if (data.length > 15 && i % Math.floor(data.length / (data.length > 30 ? 7 : 5)) !== 0 && i !== data.length -1 && i !== 0) return; 
        const label = document.createElementNS(svgNS, 'text');
        label.setAttribute('x', String(xScale(i)));
        label.setAttribute('y', String(margin.top + graphHeight + 20));
        label.textContent = d.label;
        label.classList.add('chart-label', 'x-axis-label');
        svg.appendChild(label);
    });
    
    const yTicks = 5;
    for(let i = 0; i <= yTicks; i++) {
        const val = (maxValue / yTicks) * i;
        const yPos = yScale(val);
        const tickLine = document.createElementNS(svgNS, 'line');
        tickLine.setAttribute('x1', String(margin.left - 5));
        tickLine.setAttribute('y1', String(yPos));
        tickLine.setAttribute('x2', String(margin.left));
        tickLine.setAttribute('y2', String(yPos));
        tickLine.classList.add('chart-tick');
        svg.appendChild(tickLine);

        const label = document.createElementNS(svgNS, 'text');
        label.setAttribute('x', String(margin.left - 10));
        label.setAttribute('y', String(yPos + 4)); 
        label.textContent = `RD$${val.toLocaleString('es-DO', {maximumFractionDigits: 0})}`;
        label.classList.add('chart-label', 'y-axis-label');
        svg.appendChild(label);
    }

    const lineColors = { ingresos: '#4CAF50', gastos: '#FF3B30', inversion: '#007AFF' };
    (['ingresos', 'gastos', 'inversion'] as const).forEach(type => {
        if (data.every(d => d[type] === 0 && d[type] === 0)) return; 

        const path = document.createElementNS(svgNS, 'path');
        const dAttr = data.map((d, i) => 
            `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d[type])}`
        ).join(' ');
        path.setAttribute('d', dAttr);
        path.setAttribute('stroke', lineColors[type]);
        path.setAttribute('fill', 'none');
        path.classList.add('chart-line');
        svg.appendChild(path);

        data.forEach((d, i) => {
            const circle = document.createElementNS(svgNS, 'circle');
            circle.setAttribute('cx', String(xScale(i)));
            circle.setAttribute('cy', String(yScale(d[type])));
            circle.setAttribute('r', '3');
            circle.setAttribute('fill', lineColors[type]);
            circle.classList.add('chart-point');
            svg.appendChild(circle);
        });
    });

    const legendContainer = document.createElement('div');
    legendContainer.className = 'chart-legend';
    (['ingresos', 'gastos', 'inversion'] as const).forEach(type => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        const colorBox = document.createElement('span');
        colorBox.className = 'legend-color-box';
        colorBox.style.backgroundColor = lineColors[type];
        const text = document.createElement('span');
        text.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        legendItem.appendChild(colorBox);
        legendItem.appendChild(text);
        legendContainer.appendChild(legendItem);
    });
    
    parentElement.appendChild(svg);
    parentElement.appendChild(legendContainer);
}


function renderSummaryCardComponent(title: string, value: number, currencySymbol: string, colorClass: string): HTMLDivElement {
    const card = document.createElement('div');
    card.className = `summary-card ${colorClass}`;
    
    const titleEl = document.createElement('h3');
    titleEl.textContent = title;
    
    const valueEl = document.createElement('p');
    valueEl.textContent = `${currencySymbol}${value.toLocaleString('es-DO', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    
    card.appendChild(titleEl);
    card.appendChild(valueEl);
    
    return card;
}


function renderDashboardScreen(parentElement: HTMLElement): void {
    const header = document.createElement('h1');
    header.className = 'main-header-title';
    header.textContent = 'Registros Financieros LFBBC';
    parentElement.appendChild(header);

    const dashboardMenu = document.createElement('div');
    dashboardMenu.className = 'dashboard-menu';

    const menuItems = [
        { text: 'REGISTROS FINANCIEROS', view: 'records', icon: ICONS.list },
        { text: 'INTEGRANTES', view: 'integrantes', icon: ICONS.people },
        { text: 'RAZONES', view: 'razones', icon: ICONS.list } 
    ];

    menuItems.forEach(item => {
        const button = document.createElement('button');
        button.className = 'menu-button';
        
        const iconSpan = document.createElement('span');
        iconSpan.className = 'menu-button-icon';
        iconSpan.innerHTML = item.icon; // Assuming icons are simple SVGs for now
        
        const textSpan = document.createElement('span');
        textSpan.textContent = item.text;
        
        button.appendChild(iconSpan);
        button.appendChild(textSpan);
        
        button.onclick = () => {
            currentView = item.view;
            renderApp();
        };
        dashboardMenu.appendChild(button);
    });
    parentElement.appendChild(dashboardMenu);

    const addRecordButtonDashboard = document.createElement('button');
    addRecordButtonDashboard.className = 'add-record-button-dashboard primary-button';
    addRecordButtonDashboard.textContent = 'Agregar Nuevo Registro';
    addRecordButtonDashboard.onclick = () => {
        currentView = 'records';
        // Optionally reset or prefill newRecord form states here if desired
        newRecordFecha = new Date().toISOString().split('T')[0];
        newRecordIntegranteId = null;
        newRecordIntegranteSelectedName = '';
        newRecordIntegranteSearchText = '';
        newRecordMovimiento = 'INGRESOS';
        newRecordRazonId = null;
        newRecordRazonSelectedDescripcion = '';
        newRecordRazonSearchText = '';
        newRecordDescripcion = '';
        newRecordMonto = '';
        renderApp();
    };
    parentElement.appendChild(addRecordButtonDashboard);
}

function renderFinancialPanelScreen(parentElement: HTMLElement): void {
    const header = document.createElement('h1');
    header.className = 'main-header-title'; 
    header.textContent = 'Panel Financiero';
    parentElement.appendChild(header);

    const summaryCardsContainer = document.createElement('div');
    summaryCardsContainer.className = 'summary-cards-container';

    let totalIngresos = 0;
    let totalGastosSum = 0; 
    let totalInversionSum = 0;

    financialRecords.forEach(r => {
        if (r.movimiento === 'INGRESOS') {
            totalIngresos += r.monto;
        } else if (r.movimiento === 'GASTOS') {
            totalGastosSum += r.monto; 
        } else if (r.movimiento === 'INVERSION') {
            totalInversionSum += r.monto; 
        }
    });
    
    const balanceGeneral = totalIngresos + totalGastosSum - totalInversionSum;

    summaryCardsContainer.appendChild(
        renderSummaryCardComponent('Ingresos Totales', totalIngresos, 'RD$', 'summary-ingresos')
    );
    summaryCardsContainer.appendChild(
        renderSummaryCardComponent('Gastos Totales', Math.abs(totalGastosSum), 'RD$', 'summary-gastos') 
    );
    summaryCardsContainer.appendChild(
        renderSummaryCardComponent('Balance General', balanceGeneral, 'RD$', 'summary-balance')
    );
    
    parentElement.appendChild(summaryCardsContainer);
    
    const chartSectionCard = document.createElement('div');
    chartSectionCard.className = 'dashboard-section-card';

    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'dashboard-filters-container';

    const viewTypeGroup = document.createElement('div');
    viewTypeGroup.className = 'filter-group';
    const viewTypeLabel = document.createElement('label');
    viewTypeLabel.setAttribute('for', 'dashboard-view-type');
    viewTypeLabel.textContent = 'Tipo de Vista:';
    const viewTypeSelect = document.createElement('select');
    viewTypeSelect.id = 'dashboard-view-type';
    viewTypeSelect.className = 'form-input';
    viewTypeSelect.value = dashboardViewType;
    viewTypeSelect.onchange = (e) => {
        dashboardViewType = (e.target as HTMLSelectElement).value as DashboardViewType;
        if (dashboardViewType === 'daily_trend' && dashboardSelectedYear === 'all_available') {
            const available = getAvailableYearsForFilter(financialRecords).filter(y => typeof y === 'number') as number[];
            dashboardSelectedYear = available.length > 0 ? available[0] : new Date().getFullYear();
        }
        renderApp();
    };
    [
        { value: 'annual_summary', text: 'Resumen Anual (Todos los años)' },
        { value: 'monthly_trend', text: 'Tendencia Mensual' },
        { value: 'daily_trend', text: 'Tendencia Diaria' }
    ].forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        viewTypeSelect.appendChild(option);
    });
    viewTypeGroup.appendChild(viewTypeLabel);
    viewTypeGroup.appendChild(viewTypeSelect);
    filtersContainer.appendChild(viewTypeGroup);
    viewTypeSelect.value = dashboardViewType;

    const yearGroup = document.createElement('div');
    yearGroup.className = 'filter-group';
    const yearLabel = document.createElement('label');
    yearLabel.setAttribute('for', 'dashboard-year');
    yearLabel.textContent = 'Año:';
    const yearSelect = document.createElement('select');
    yearSelect.id = 'dashboard-year';
    yearSelect.className = 'form-input';
    
    const availableYears = getAvailableYearsForFilter(financialRecords);
    availableYears.forEach(year => {
        const option = document.createElement('option');
        option.value = String(year);
        option.textContent = year === 'all_available' ? 'Todos los Años Disponibles' : String(year);
        yearSelect.appendChild(option);
    });
    
    yearSelect.value = String(dashboardSelectedYear);
    yearSelect.onchange = (e) => {
        const val = (e.target as HTMLSelectElement).value;
        const newSelectedYear = val === 'all_available' ? 'all_available' : parseInt(val, 10);

        if (dashboardViewType === 'daily_trend' && newSelectedYear === 'all_available') {
            const specificYears = getAvailableYearsForFilter(financialRecords).filter(y => typeof y === 'number') as number[];
            dashboardSelectedYear = specificYears.length > 0 ? specificYears[0] : new Date().getFullYear();
        } else {
            dashboardSelectedYear = newSelectedYear;
        }
        renderApp();
    };
    yearGroup.appendChild(yearLabel);
    yearGroup.appendChild(yearSelect);
    if (dashboardViewType !== 'annual_summary') {
         filtersContainer.appendChild(yearGroup);
    }

    if (dashboardViewType === 'daily_trend') {
        const monthGroup = document.createElement('div');
        monthGroup.className = 'filter-group';
        const monthLabel = document.createElement('label');
        monthLabel.setAttribute('for', 'dashboard-month');
        monthLabel.textContent = 'Mes:';
        const monthSelect = document.createElement('select');
        monthSelect.id = 'dashboard-month';
        monthSelect.className = 'form-input';
        
        MONTH_NAMES_ES.forEach((name, index) => {
            const option = document.createElement('option');
            option.value = String(index + 1); // 1-12
            option.textContent = name;
            monthSelect.appendChild(option);
        });
        monthSelect.value = String(dashboardSelectedMonth);
        monthSelect.onchange = (e) => {
            dashboardSelectedMonth = parseInt((e.target as HTMLSelectElement).value, 10);
            renderApp();
        };
        monthGroup.appendChild(monthLabel);
        monthGroup.appendChild(monthSelect);
        filtersContainer.appendChild(monthGroup);
    }
    
    chartSectionCard.appendChild(filtersContainer);

    const chartContainer = document.createElement('div');
    chartContainer.className = 'dashboard-chart-container';
    chartSectionCard.appendChild(chartContainer);
    
    parentElement.appendChild(chartSectionCard);
    
    const chartData = getProcessedChartData();
    renderTrendChartSVG(chartContainer, chartData);
}


function renderRecordsScreen(parentElement: HTMLElement): void {
    const header = document.createElement('h1');
    header.className = 'header-title';
    header.innerHTML = 'Gestión de Registros';
    parentElement.appendChild(header);

    const form = document.createElement('form');
    form.className = 'record-form';
    form.onsubmit = (e) => {
        e.preventDefault();
        handleAddRecord();
    };

    const fechaGroup = document.createElement('div');
    fechaGroup.className = 'form-group';
    const fechaLabel = document.createElement('label');
    fechaLabel.setAttribute('for', 'record-fecha');
    fechaLabel.textContent = 'Fecha:';
    const fechaInput = document.createElement('input');
    fechaInput.type = 'date';
    fechaInput.id = 'record-fecha';
    fechaInput.className = 'form-input';
    fechaInput.value = newRecordFecha;
    fechaInput.onchange = (e) => newRecordFecha = (e.target as HTMLInputElement).value;
    fechaGroup.appendChild(fechaLabel);
    fechaGroup.appendChild(fechaInput);
    form.appendChild(fechaGroup);

    const integranteSelectedDisplayGroup = document.createElement('div');
    integranteSelectedDisplayGroup.className = 'form-group';
    const integranteSelectedLabel = document.createElement('label');
    integranteSelectedLabel.setAttribute('for', 'record-integrante-selected-display');
    integranteSelectedLabel.textContent = 'Integrante Seleccionado:';
    const integranteSelectedDisplayInput = document.createElement('input');
    integranteSelectedDisplayInput.type = 'text';
    integranteSelectedDisplayInput.id = 'record-integrante-selected-display';
    integranteSelectedDisplayInput.className = 'form-input selected-item-display';
    integranteSelectedDisplayInput.readOnly = true;
    integranteSelectedDisplayInput.value = newRecordIntegranteSelectedName || 'Ninguno';
    integranteSelectedDisplayGroup.appendChild(integranteSelectedLabel);
    integranteSelectedDisplayGroup.appendChild(integranteSelectedDisplayInput);
    form.appendChild(integranteSelectedDisplayGroup);

    const integranteFilterGroup = document.createElement('div');
    integranteFilterGroup.className = 'form-group filter-selection-group';
    const integranteFilterLabel = document.createElement('label');
    integranteFilterLabel.setAttribute('for', RECORD_INTEGRANTE_FILTER_INPUT_ID);
    integranteFilterLabel.textContent = 'Buscar y Seleccionar Integrante:';
    const integranteFilterInput = document.createElement('input');
    integranteFilterInput.type = 'text';
    integranteFilterInput.id = RECORD_INTEGRANTE_FILTER_INPUT_ID;
    integranteFilterInput.className = 'form-input';
    integranteFilterInput.placeholder = 'Escriba para filtrar integrantes...';
    integranteFilterInput.value = newRecordIntegranteSearchText;
    integranteFilterInput.autocomplete = 'off';
    integranteFilterInput.oninput = (e) => {
        newRecordIntegranteSearchText = (e.target as HTMLInputElement).value;
        focusTargetId = RECORD_INTEGRANTE_FILTER_INPUT_ID;
        renderApp();
    };
    integranteFilterGroup.appendChild(integranteFilterLabel);
    integranteFilterGroup.appendChild(integranteFilterInput);

    const integranteListWrapper = document.createElement('div');
    integranteListWrapper.className = 'selectable-list-wrapper';
    const integranteUl = document.createElement('ul');
    integranteUl.className = 'selectable-list';
    const currentFilteredIntegrantes = newRecordIntegranteSearchText.trim() === ''
        ? [...integrantes].sort((a,b) => a.nombre.localeCompare(b.nombre))
        : integrantes.filter(inte => inte.nombre.toLowerCase().includes(newRecordIntegranteSearchText.toLowerCase()))
                     .sort((a,b) => a.nombre.localeCompare(b.nombre));

    if (currentFilteredIntegrantes.length === 0 && newRecordIntegranteSearchText.trim() !== '') {
        const noResultItem = document.createElement('li');
        noResultItem.textContent = 'Ningún integrante coincide';
        noResultItem.className = 'selectable-list-item disabled';
        integranteUl.appendChild(noResultItem);
    } else {
        currentFilteredIntegrantes.forEach(integrante => {
            const listItem = document.createElement('li');
            listItem.className = 'selectable-list-item';
            listItem.textContent = integrante.nombre;
            listItem.onclick = () => {
                newRecordIntegranteId = integrante.id;
                newRecordIntegranteSelectedName = integrante.nombre;
                focusTargetId = RECORD_INTEGRANTE_FILTER_INPUT_ID; 
                renderApp();
            };
            integranteUl.appendChild(listItem);
        });
    }
    integranteListWrapper.appendChild(integranteUl);
    integranteFilterGroup.appendChild(integranteListWrapper);
    form.appendChild(integranteFilterGroup);


    const movimientoGroup = document.createElement('div');
    movimientoGroup.className = 'form-group';
    const movimientoLabel = document.createElement('label');
    movimientoLabel.setAttribute('for', 'record-movimiento');
    movimientoLabel.textContent = 'Movimiento:';
    const movimientoSelect = document.createElement('select');
    movimientoSelect.id = 'record-movimiento';
    movimientoSelect.className = 'form-input';
    movimientoSelect.value = newRecordMovimiento;
    movimientoSelect.onchange = (e) => newRecordMovimiento = (e.target as HTMLSelectElement).value as 'INGRESOS' | 'GASTOS' | 'INVERSION';
    ['INGRESOS', 'GASTOS', 'INVERSION'].forEach(mov => {
        const option = document.createElement('option');
        option.value = mov;
        option.textContent = mov.charAt(0) + mov.slice(1).toLowerCase();
        if (newRecordMovimiento === mov) option.selected = true;
        movimientoSelect.appendChild(option);
    });
    movimientoGroup.appendChild(movimientoLabel);
    movimientoGroup.appendChild(movimientoSelect);
    form.appendChild(movimientoGroup);

    const razonSelectedDisplayGroup = document.createElement('div');
    razonSelectedDisplayGroup.className = 'form-group';
    const razonSelectedLabel = document.createElement('label');
    razonSelectedLabel.setAttribute('for', 'record-razon-selected-display');
    razonSelectedLabel.textContent = 'Razón Seleccionada:';
    const razonSelectedDisplayInput = document.createElement('input');
    razonSelectedDisplayInput.type = 'text';
    razonSelectedDisplayInput.id = 'record-razon-selected-display';
    razonSelectedDisplayInput.className = 'form-input selected-item-display';
    razonSelectedDisplayInput.readOnly = true;
    razonSelectedDisplayInput.value = newRecordRazonSelectedDescripcion || 'Ninguna';
    razonSelectedDisplayGroup.appendChild(razonSelectedLabel);
    razonSelectedDisplayGroup.appendChild(razonSelectedDisplayInput);
    form.appendChild(razonSelectedDisplayGroup);

    const razonFilterGroup = document.createElement('div');
    razonFilterGroup.className = 'form-group filter-selection-group';
    const razonFilterLabel = document.createElement('label');
    razonFilterLabel.setAttribute('for', RECORD_RAZON_FILTER_INPUT_ID);
    razonFilterLabel.textContent = 'Buscar y Seleccionar Razón:';
    const razonFilterInput = document.createElement('input');
    razonFilterInput.type = 'text';
    razonFilterInput.id = RECORD_RAZON_FILTER_INPUT_ID;
    razonFilterInput.className = 'form-input';
    razonFilterInput.placeholder = 'Escriba para filtrar razones...';
    razonFilterInput.value = newRecordRazonSearchText;
    razonFilterInput.autocomplete = 'off';
    razonFilterInput.oninput = (e) => {
        newRecordRazonSearchText = (e.target as HTMLInputElement).value;
        focusTargetId = RECORD_RAZON_FILTER_INPUT_ID;
        renderApp();
    };
    razonFilterGroup.appendChild(razonFilterLabel);
    razonFilterGroup.appendChild(razonFilterInput);

    const razonListWrapper = document.createElement('div');
    razonListWrapper.className = 'selectable-list-wrapper';
    const razonUl = document.createElement('ul');
    razonUl.className = 'selectable-list';
    const currentFilteredRazones = newRecordRazonSearchText.trim() === ''
        ? [...razones].sort((a,b) => a.descripcion.localeCompare(b.descripcion))
        : razones.filter(raz => raz.descripcion.toLowerCase().includes(newRecordRazonSearchText.toLowerCase()))
                   .sort((a,b) => a.descripcion.localeCompare(b.descripcion));
    
    if (currentFilteredRazones.length === 0 && newRecordRazonSearchText.trim() !== '') {
        const noResultItem = document.createElement('li');
        noResultItem.textContent = 'Ninguna razón coincide';
        noResultItem.className = 'selectable-list-item disabled';
        razonUl.appendChild(noResultItem);
    } else {
        currentFilteredRazones.forEach(razon => {
            const listItem = document.createElement('li');
            listItem.className = 'selectable-list-item';
            listItem.textContent = razon.descripcion;
            listItem.onclick = () => {
                newRecordRazonId = razon.id;
                newRecordRazonSelectedDescripcion = razon.descripcion;
                focusTargetId = RECORD_RAZON_FILTER_INPUT_ID; 
                renderApp();
            };
            razonUl.appendChild(listItem);
        });
    }
    razonListWrapper.appendChild(razonUl);
    razonFilterGroup.appendChild(razonListWrapper);
    form.appendChild(razonFilterGroup);


    const descripcionGroup = document.createElement('div');
    descripcionGroup.className = 'form-group';
    const descripcionLabel = document.createElement('label');
    descripcionLabel.setAttribute('for', 'record-descripcion');
    descripcionLabel.textContent = 'Descripción/Detalles:';
    const descripcionTextarea = document.createElement('textarea');
    descripcionTextarea.id = 'record-descripcion';
    descripcionTextarea.className = 'form-input';
    descripcionTextarea.rows = 3;
    descripcionTextarea.value = newRecordDescripcion;
    descripcionTextarea.oninput = (e) => newRecordDescripcion = (e.target as HTMLTextAreaElement).value;
    descripcionGroup.appendChild(descripcionLabel);
    descripcionGroup.appendChild(descripcionTextarea);
    form.appendChild(descripcionGroup);

    const montoGroup = document.createElement('div');
    montoGroup.className = 'form-group';
    const montoLabel = document.createElement('label');
    montoLabel.setAttribute('for', 'record-monto');
    montoLabel.textContent = 'Monto (RD$):';
    const montoInput = document.createElement('input');
    montoInput.type = 'number';
    montoInput.id = 'record-monto';
    montoInput.className = 'form-input';
    montoInput.step = '0.01';
    montoInput.placeholder = '0.00';
    montoInput.value = newRecordMonto;
    montoInput.oninput = (e) => newRecordMonto = (e.target as HTMLInputElement).value;
    montoGroup.appendChild(montoLabel);
    montoGroup.appendChild(montoInput);
    form.appendChild(montoGroup);

    const addButton = document.createElement('button');
    addButton.type = 'submit';
    addButton.textContent = 'Agregar Registro';
    addButton.className = 'add-record-button primary-button';
    form.appendChild(addButton);

    parentElement.appendChild(form);

    const csvActionsContainer = document.createElement('div');
    csvActionsContainer.className = 'import-export-actions';

    const importButton = document.createElement('button');
    importButton.textContent = 'Importar CSV (Registros)';
    importButton.className = 'csv-action-button';
    importButton.onclick = () => {
        document.getElementById(CSV_FILE_INPUT_ID)?.click();
    };
    csvActionsContainer.appendChild(importButton);

    const exportButton = document.createElement('button');
    exportButton.textContent = 'Exportar CSV (Registros)';
    exportButton.className = 'csv-action-button';
    exportButton.onclick = handleExportFinancialRecordsCSV;
    csvActionsContainer.appendChild(exportButton);

    const csvFileInput = document.createElement('input');
    csvFileInput.type = 'file';
    csvFileInput.id = CSV_FILE_INPUT_ID;
    csvFileInput.accept = '.csv';
    csvFileInput.style.display = 'none';
    csvFileInput.onchange = handleImportFinancialRecordsCSVFile;
    csvActionsContainer.appendChild(csvFileInput);

    parentElement.appendChild(csvActionsContainer);


    const tableContainer = document.createElement('div');
    tableContainer.className = 'records-table-container';
    const table = document.createElement('table');
    table.className = 'records-table';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['Fecha', 'Integrante', 'Movimiento', 'Razón', 'Descripción', 'Monto'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    [...financialRecords].sort((a,b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime() || b.id - a.id).forEach(record => {
        const tr = document.createElement('tr');
        const integrante = integrantes.find(i => i.id === record.integranteId);
        const razon = razones.find(r => r.id === record.razonId);

        const cells = [
            record.fecha,
            integrante ? integrante.nombre : 'Desconocido',
            record.movimiento.charAt(0) + record.movimiento.slice(1).toLowerCase(),
            razon ? razon.descripcion : 'Desconocido',
            record.descripcion,
            `RD$${record.monto.toLocaleString('es-DO', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        ];
        cells.forEach(cellText => {
            const td = document.createElement('td');
            td.textContent = cellText;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    tableContainer.appendChild(table);
    parentElement.appendChild(tableContainer);
}

function handleAddRecord() {
    if (!newRecordFecha || newRecordIntegranteId === null || !newRecordMovimiento || newRecordRazonId === null || newRecordMonto === '') {
        alert('Por favor, complete todos los campos obligatorios (Fecha, Integrante, Movimiento, Razón, Monto). El integrante y la razón deben ser seleccionados de la lista.');
        return;
    }
    const montoValue = parseFloat(newRecordMonto);
    if (isNaN(montoValue)) {
        alert('El monto debe ser un número válido.');
        return;
    }

    const newRecord: FinancialRecord = {
        id: nextRecordId++,
        fecha: newRecordFecha,
        integranteId: newRecordIntegranteId,
        movimiento: newRecordMovimiento,
        razonId: newRecordRazonId,
        descripcion: newRecordDescripcion.trim(),
        monto: montoValue
    };

    financialRecords.push(newRecord);
    saveFinancialRecords();

    newRecordFecha = new Date().toISOString().split('T')[0];
    newRecordIntegranteId = null;
    newRecordIntegranteSelectedName = '';
    newRecordIntegranteSearchText = '';
    newRecordMovimiento = 'INGRESOS';
    newRecordRazonId = null;
    newRecordRazonSelectedDescripcion = '';
    newRecordRazonSearchText = '';
    newRecordDescripcion = '';
    newRecordMonto = '';

    renderApp();
}

function escapeCsvValue(value: any): string {
    const strValue = String(value == null ? '' : value);
    if (strValue.includes(',') || strValue.includes('"') || strValue.includes('\n') || strValue.includes('\r')) {
        return `"${strValue.replace(/"/g, '""')}"`;
    }
    return strValue;
}

function triggerCsvDownload(csvString: string, fileName: string): void {
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } else {
        alert("La descarga automática de CSV no es compatible con su navegador.");
    }
}

function handleExportFinancialRecordsCSV() {
    if (financialRecords.length === 0) {
        alert('No hay registros financieros para exportar.');
        return;
    }

    const headers = ['Fecha', 'Integrante', 'Movimiento', 'Razón', 'Descripción Detallada', 'Monto'];
    const csvRows = [headers.join(',')];

    financialRecords.forEach(record => {
        const integrante = integrantes.find(i => i.id === record.integranteId);
        const razon = razones.find(r => r.id === record.razonId);
        const row = [
            escapeCsvValue(record.fecha),
            escapeCsvValue(integrante ? integrante.nombre : 'Desconocido'),
            escapeCsvValue(record.movimiento),
            escapeCsvValue(razon ? razon.descripcion : 'Desconocido'),
            escapeCsvValue(record.descripcion),
            escapeCsvValue(record.monto) 
        ];
        csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\r\n');
    const currentDate = new Date().toISOString().split('T')[0];
    triggerCsvDownload(csvString, `registros_financieros_LFBBC_${currentDate}.csv`);
}

function parseCsvLine(line: string): string[] {
    const result: string[] = [];
    let currentField = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
                currentField += '"'; 
                i++; 
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            result.push(currentField);
            currentField = '';
        } else {
            currentField += char;
        }
    }
    result.push(currentField); 
    return result;
}

function parseFlexibleDate(dateString: string): string | null {
    dateString = dateString.trim();

    const dmyMatch = dateString.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (dmyMatch) {
        const day = parseInt(dmyMatch[1], 10);
        const month = parseInt(dmyMatch[2], 10); 
        const year = parseInt(dmyMatch[3], 10);

        if (year > 1000 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
            const dateObj = new Date(year, month - 1, day);
            if (dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === day) {
                return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            }
        }
    }

    const ymdMatchStrict = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (ymdMatchStrict) {
        const year = parseInt(ymdMatchStrict[1], 10);
        const month = parseInt(ymdMatchStrict[2], 10);
        const day = parseInt(ymdMatchStrict[3], 10);
        if (year > 1000 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
            const dateObj = new Date(year, month - 1, day);
            if (dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === day) {
                return dateString;
            }
        }
    }

    if (dateString.includes('-')) {
        const parts = dateString.split('-');
        if (parts.length === 3) {
            const year = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10);
            const day = parseInt(parts[2], 10);

             if (!isNaN(year) && year > 1000 && !isNaN(month) && month >= 1 && month <= 12 && !isNaN(day) && day >=1 && day <=31) {
                const dateObj = new Date(year, month - 1, day);
                if (dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === day) {
                     return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                }
            }
        }
    }
    return null;
}


function handleImportFinancialRecordsCSVFile(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) {
        alert('No se seleccionó ningún archivo.');
        return;
    }

    if (file.type !== 'text/csv' && !file.name.toLowerCase().endsWith('.csv')) {
        alert('Por favor, seleccione un archivo CSV válido.');
        fileInput.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target?.result as string;
        if (!text) {
            alert('El archivo CSV está vacío o no se pudo leer.');
            fileInput.value = '';
            return;
        }

        const lines = text.split(/\r\n|\n/).filter(line => line.trim() !== '');
        if (lines.length < 2) {
            alert('El archivo CSV debe contener al menos una fila de encabezado y una fila de datos.');
            fileInput.value = '';
            return;
        }

        const headerLine = lines[0];
        const headersFromCsv = parseCsvLine(headerLine).map(h => h.trim().toLowerCase());
        const expectedHeaders = ['fecha', 'integrante', 'movimiento', 'razón', 'descripción detallada', 'monto'];

        const headerMap: { [key: string]: number } = {};
        headersFromCsv.forEach((h, i) => headerMap[h] = i);

        const missingHeaders = expectedHeaders.filter(eh => headerMap[eh] === undefined);
        if (missingHeaders.length > 0) {
             alert(`Encabezados faltantes o incorrectos en el CSV de registros. Esperados: ${expectedHeaders.join(', ')}. Encontrados: ${headersFromCsv.join(', ')}.\nFaltantes: ${missingHeaders.join(', ')}`);
            fileInput.value = '';
            return;
        }


        let importedCount = 0;
        let skippedCount = 0;
        const newRecordsBatch: FinancialRecord[] = [];

        for (let i = 1; i < lines.length; i++) {
            const values = parseCsvLine(lines[i]);
            if (values.length !== expectedHeaders.length) {
                console.warn(`Fila ${i+1} (registros) omitida: número incorrecto de columnas. Esperadas ${expectedHeaders.length}, obtenidas ${values.length}. Contenido: ${lines[i]}`);
                skippedCount++;
                continue;
            }

            const rawFecha = values[headerMap['fecha']].trim();
            const integranteNombre = values[headerMap['integrante']].trim();
            const movimientoTipo = values[headerMap['movimiento']].trim().toUpperCase() as 'INGRESOS' | 'GASTOS' | 'INVERSION';
            const razonDescripcion = values[headerMap['razón']].trim();
            const descripcionDetallada = values[headerMap['descripción detallada']].trim();
            const montoStr = values[headerMap['monto']].trim();

            const fecha = parseFlexibleDate(rawFecha);
            if (!fecha) {
                console.warn(`Fila ${i+1} (registros) omitida: Fecha inválida '${rawFecha}'. Formatos aceptados: YYYY-MM-DD o DD/MM/YYYY.`);
                skippedCount++;
                continue;
            }

            const integrante = integrantes.find(inte => inte.nombre.toLowerCase() === integranteNombre.toLowerCase());
            if (!integrante) {
                console.warn(`Fila ${i+1} (registros) omitida: Integrante '${integranteNombre}' no encontrado.`);
                skippedCount++;
                continue;
            }

            if (!['INGRESOS', 'GASTOS', 'INVERSION'].includes(movimientoTipo)) {
                console.warn(`Fila ${i+1} (registros) omitida: Tipo de Movimiento inválido '${movimientoTipo}'.`);
                skippedCount++;
                continue;
            }

            const razon = razones.find(raz => raz.descripcion.toLowerCase() === razonDescripcion.toLowerCase());
            if (!razon) {
                console.warn(`Fila ${i+1} (registros) omitida: Razón '${razonDescripcion}' no encontrada.`);
                skippedCount++;
                continue;
            }

            const monto = parseFloat(montoStr);
            if (isNaN(monto)) {
                console.warn(`Fila ${i+1} (registros) omitida: Monto inválido '${montoStr}'. Debe ser un número.`);
                skippedCount++;
                continue;
            }

            newRecordsBatch.push({
                id: 0,
                fecha: fecha,
                integranteId: integrante.id,
                movimiento: movimientoTipo,
                razonId: razon.id,
                descripcion: descripcionDetallada,
                monto: monto
            });
            importedCount++;
        }

        if (newRecordsBatch.length > 0) {
            newRecordsBatch.forEach(record => {
                record.id = nextRecordId++;
                financialRecords.push(record);
            });
            saveFinancialRecords();
        }

        alert(`${importedCount} registro(s) financiero(s) importado(s) con éxito.\n${skippedCount} fila(s) omitida(s). Revise la consola para detalles.`);
        fileInput.value = '';
        renderApp();
    };

    reader.onerror = () => {
        alert('Error al leer el archivo CSV de registros.');
        fileInput.value = '';
    };

    reader.readAsText(file);
}

function handleExportRazonesCSV() {
    if (razones.length === 0) {
        alert('No hay razones para exportar.');
        return;
    }
    const headers = ['ID', 'Descripcion'];
    const csvRows = [headers.join(',')];
    razones.forEach(razon => {
        const row = [
            escapeCsvValue(razon.id),
            escapeCsvValue(razon.descripcion)
        ];
        csvRows.push(row.join(','));
    });
    const csvString = csvRows.join('\r\n');
    const currentDate = new Date().toISOString().split('T')[0];
    triggerCsvDownload(csvString, `razones_LFBBC_${currentDate}.csv`);
}

function handleImportRazonesCSVFile(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (!file) { alert('No se seleccionó ningún archivo.'); return; }
    if (file.type !== 'text/csv' && !file.name.toLowerCase().endsWith('.csv')) {
        alert('Por favor, seleccione un archivo CSV válido para razones.');
        fileInput.value = ''; return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target?.result as string;
        if (!text) { alert('El archivo CSV de razones está vacío.'); fileInput.value = ''; return; }

        const lines = text.split(/\r\n|\n/).filter(line => line.trim() !== '');
        if (lines.length < 1) { 
            alert('El archivo CSV de razones no contiene datos válidos.'); fileInput.value = ''; return;
        }

        const headerLine = lines[0];
        const headersFromCsv = parseCsvLine(headerLine).map(h => h.trim().toLowerCase());
        const idColIdx = headersFromCsv.indexOf('id');
        const descColIdx = headersFromCsv.indexOf('descripcion');

        if (descColIdx === -1) {
            alert(`Encabezado requerido 'Descripcion' no encontrado en el CSV de razones. Encontrados: ${headersFromCsv.join(', ')}`);
            fileInput.value = ''; return;
        }

        let importedCount = 0, updatedCount = 0, skippedCount = 0;

        for (let i = 1; i < lines.length; i++) {
            const values = parseCsvLine(lines[i]);
            const rawDesc = values[descColIdx]?.trim().toUpperCase();

            if (!rawDesc) {
                console.warn(`Fila ${i+1} (razones) omitida: Descripción está vacía.`);
                skippedCount++; continue;
            }

            const csvIdStr = (idColIdx !== -1) ? values[idColIdx]?.trim() : null;
            let csvId: number | null = null;
            if (csvIdStr) {
                const parsed = parseInt(csvIdStr, 10);
                if (!isNaN(parsed) && parsed > 0) csvId = parsed;
                else console.warn(`Fila ${i+1} (razones): ID '${csvIdStr}' inválido. Se tratará como nueva si la descripción es única.`);
            }

            if (csvId !== null) { 
                const existingRazon = razones.find(r => r.id === csvId);
                if (existingRazon) { 
                    if (existingRazon.descripcion.toUpperCase() !== rawDesc) {
                        if (razones.some(r => r.id !== csvId && r.descripcion.toUpperCase() === rawDesc)) {
                            console.warn(`Fila ${i+1} (razones) omitida: Nueva descripción '${rawDesc}' para ID ${csvId} ya existe con otro ID.`);
                            skippedCount++;
                        } else {
                            existingRazon.descripcion = rawDesc;
                            updatedCount++;
                        }
                    } 
                } else { 
                    if (razones.some(r => r.descripcion.toUpperCase() === rawDesc)) {
                        console.warn(`Fila ${i+1} (razones) omitida: Descripción '${rawDesc}' para nuevo ID ${csvId} ya existe.`);
                        skippedCount++;
                    } else {
                        razones.push({ id: csvId, descripcion: rawDesc });
                        nextReasonId = Math.max(nextReasonId, csvId + 1);
                        importedCount++;
                    }
                }
            } else { 
                if (razones.some(r => r.descripcion.toUpperCase() === rawDesc)) {
                    console.warn(`Fila ${i+1} (razones) omitida: Descripción '${rawDesc}' ya existe (sin ID válido).`);
                    skippedCount++;
                } else {
                    razones.push({ id: nextReasonId++, descripcion: rawDesc });
                    importedCount++;
                }
            }
        }
        if (importedCount > 0 || updatedCount > 0) saveRazonesToLocalStorage();
        alert(`Razones importadas: ${importedCount}, actualizadas: ${updatedCount}, omitidas: ${skippedCount}. Revise consola para detalles.`);
        fileInput.value = '';
        renderApp();
    };
    reader.onerror = () => { alert('Error al leer el archivo CSV de razones.'); fileInput.value = ''; };
    reader.readAsText(file);
}


function renderRazonesScreen(parentElement: HTMLElement): void {
    const header = document.createElement('h2');
    header.className = 'section-header';
    header.textContent = 'Gestión de Razones';
    parentElement.appendChild(header);

    const csvActionsContainer = document.createElement('div');
    csvActionsContainer.className = 'import-export-actions section-import-export';

    const importButtonCsv = document.createElement('button');
    importButtonCsv.textContent = 'Importar CSV (Razones)';
    importButtonCsv.className = 'csv-action-button';
    importButtonCsv.onclick = () => document.getElementById(RAZON_CSV_FILE_INPUT_ID)?.click();
    csvActionsContainer.appendChild(importButtonCsv);

    const exportButtonCsv = document.createElement('button');
    exportButtonCsv.textContent = 'Exportar CSV (Razones)';
    exportButtonCsv.className = 'csv-action-button';
    exportButtonCsv.onclick = handleExportRazonesCSV;
    csvActionsContainer.appendChild(exportButtonCsv);

    const csvFileInput = document.createElement('input');
    csvFileInput.type = 'file';
    csvFileInput.id = RAZON_CSV_FILE_INPUT_ID;
    csvFileInput.accept = '.csv';
    csvFileInput.style.display = 'none';
    csvFileInput.onchange = handleImportRazonesCSVFile;
    csvActionsContainer.appendChild(csvFileInput);
    parentElement.appendChild(csvActionsContainer);


    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', 'Buscar razón...');
    searchInput.className = 'razon-input search-razon-input';
    searchInput.id = RAZON_SEARCH_INPUT_ID;
    searchInput.value = razonesSearchTerm;
    searchInput.oninput = (e) => {
        const inputElement = e.target as HTMLInputElement;
        razonesSearchTerm = inputElement.value;
        renderApp();
        focusTargetId = RAZON_SEARCH_INPUT_ID;
    };
    searchInput.onfocus = () => {
        focusTargetId = RAZON_SEARCH_INPUT_ID;
    };
    searchContainer.appendChild(searchInput);
    parentElement.appendChild(searchContainer);

    const addForm = document.createElement('div');
    addForm.className = 'razon-form add-form';
    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('placeholder', 'Descripción de la nueva razón');
    newInput.className = 'razon-input';
    newInput.value = newReasonInputText;
    newInput.oninput = (e) => newReasonInputText = (e.target as HTMLInputElement).value;

    const addButton = document.createElement('button');
    addButton.textContent = 'Agregar Razón';
    addButton.className = 'nav-button primary-button';
    addButton.onclick = () => {
        const trimmedText = newReasonInputText.trim().toUpperCase();
        if (trimmedText) {
            if (razones.some(r => r.descripcion.toUpperCase() === trimmedText)) {
                alert('Esta razón ya existe.');
                return;
            }
            razones.push({ id: nextReasonId++, descripcion: trimmedText });
            saveRazonesToLocalStorage();
            newReasonInputText = '';
            editingReasonId = null;
            renderApp();
        } else {
            alert('La descripción no puede estar vacía.');
        }
    };
    addForm.appendChild(newInput);
    addForm.appendChild(addButton);
    parentElement.appendChild(addForm);

    const sortContainer = document.createElement('div');
    sortContainer.className = 'sort-controls-container';
    const sortLabel = document.createElement('label');
    sortLabel.setAttribute('for', 'razon-sort-select');
    sortLabel.textContent = 'Ordenar por:';
    sortLabel.className = 'sort-label';

    const sortSelect = document.createElement('select');
    sortSelect.id = 'razon-sort-select';
    sortSelect.className = 'sort-select form-input';
    sortSelect.value = razonesSortOrder;
    sortSelect.onchange = (e) => {
        razonesSortOrder = (e.target as HTMLSelectElement).value as typeof razonesSortOrder;
        renderApp();
    };

    const sortOptions = [
        { value: 'alpha_asc', text: 'Alfabético (A-Z)' },
        { value: 'alpha_desc', text: 'Alfabético (Z-A)' },
        { value: 'id_asc', text: 'ID (Ascendente)' },
        { value: 'id_desc', text: 'ID (Descendente)' }
    ];

    sortOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        if (razonesSortOrder === opt.value) option.selected = true;
        sortSelect.appendChild(option);
    });
    sortContainer.appendChild(sortLabel);
    sortContainer.appendChild(sortSelect);
    parentElement.appendChild(sortContainer);


    const listContainer = document.createElement('ul');
    listContainer.className = 'razones-list';
    let filteredRazones = razones.filter(razon =>
        razon.descripcion.toLowerCase().includes(razonesSearchTerm.toLowerCase())
    );

    const sortedRazones = [...filteredRazones]; 
    switch (razonesSortOrder) {
        case 'id_asc':
            sortedRazones.sort((a, b) => a.id - b.id);
            break;
        case 'id_desc':
            sortedRazones.sort((a, b) => b.id - a.id);
            break;
        case 'alpha_asc':
            sortedRazones.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
            break;
        case 'alpha_desc':
            sortedRazones.sort((a, b) => b.descripcion.localeCompare(a.descripcion));
            break;
    }


    sortedRazones.forEach(razon => {
        const listItem = document.createElement('li');
        listItem.className = 'razon-item';
        if (editingReasonId === razon.id) {
            const editInput = document.createElement('input');
            editInput.setAttribute('type', 'text');
            editInput.className = 'razon-input';
            editInput.value = editReasonInputText;
            editInput.oninput = (e) => editReasonInputText = (e.target as HTMLInputElement).value;
            const EDIT_INPUT_ID = `edit-razon-${razon.id}`;
            editInput.id = EDIT_INPUT_ID;
            focusTargetId = EDIT_INPUT_ID; 

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Guardar';
            saveButton.className = 'nav-button action-button-inline success-button';
            saveButton.onclick = () => {
                const trimmedEditText = editReasonInputText.trim().toUpperCase();
                if (trimmedEditText) {
                    if (razones.some(r => r.descripcion.toUpperCase() === trimmedEditText && r.id !== razon.id)) {
                        alert('Ya existe otra razón con esta descripción.');
                        return;
                    }
                    const index = razones.findIndex(r => r.id === razon.id);
                    if (index !== -1) {
                        razones[index].descripcion = trimmedEditText;
                        saveRazonesToLocalStorage();
                    }
                    editingReasonId = null;
                    renderApp();
                } else {
                     alert('La descripción no puede estar vacía.');
                }
            };
            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'Cancelar';
            cancelButton.className = 'nav-button action-button-inline danger-button';
            cancelButton.onclick = () => {
                editingReasonId = null;
                renderApp();
            };
            listItem.appendChild(editInput); listItem.appendChild(saveButton); listItem.appendChild(cancelButton);
        } else {
            const textSpan = document.createElement('span');
            textSpan.className = 'razon-text';
            textSpan.textContent = `${razon.id}. ${razon.descripcion}`;
            const actionsContainer = document.createElement('div');
            actionsContainer.className = 'list-item-actions';
            const editButton = document.createElement('button');
            editButton.innerHTML = ICONS.edit;
            editButton.className = 'icon-button edit-icon-button';
            editButton.setAttribute('aria-label', 'Editar Razón');
            editButton.onclick = () => {
                editingReasonId = razon.id;
                editReasonInputText = razon.descripcion;
                renderApp();
            };
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = ICONS.delete;
            deleteButton.className = 'icon-button delete-icon-button';
            deleteButton.setAttribute('aria-label', 'Eliminar Razón');
            deleteButton.onclick = () => {
                 if (financialRecords.some(fr => fr.razonId === razon.id)) {
                    alert(`No se puede eliminar la razón "${razon.descripcion}" porque está siendo utilizada en registros financieros.`);
                    return;
                }
                if (window.confirm(`¿Está seguro de que desea eliminar la razón "${razon.descripcion}" (ID: ${razon.id})?`)) {
                    razones = razones.filter(r => r.id !== razon.id);
                    saveRazonesToLocalStorage();
                    if (editingReasonId === razon.id) editingReasonId = null;
                    renderApp();
                }
            };
            actionsContainer.appendChild(editButton); actionsContainer.appendChild(deleteButton);
            listItem.appendChild(textSpan); listItem.appendChild(actionsContainer);
        }
        listContainer.appendChild(listItem);
    });
    parentElement.appendChild(listContainer);
}

function handleExportIntegrantesCSV() {
    if (integrantes.length === 0) {
        alert('No hay integrantes para exportar.');
        return;
    }
    const headers = ['ID', 'Nombre'];
    const csvRows = [headers.join(',')];
    integrantes.forEach(integrante => {
        const row = [
            escapeCsvValue(integrante.id),
            escapeCsvValue(integrante.nombre)
        ];
        csvRows.push(row.join(','));
    });
    const csvString = csvRows.join('\r\n');
    const currentDate = new Date().toISOString().split('T')[0];
    triggerCsvDownload(csvString, `integrantes_LFBBC_${currentDate}.csv`);
}

function handleImportIntegrantesCSVFile(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (!file) { alert('No se seleccionó ningún archivo.'); return; }
    if (file.type !== 'text/csv' && !file.name.toLowerCase().endsWith('.csv')) {
        alert('Por favor, seleccione un archivo CSV válido para integrantes.');
        fileInput.value = ''; return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target?.result as string;
        if (!text) { alert('El archivo CSV de integrantes está vacío.'); fileInput.value = ''; return; }

        const lines = text.split(/\r\n|\n/).filter(line => line.trim() !== '');
        if (lines.length < 1) {
             alert('El archivo CSV de integrantes no contiene datos válidos.'); fileInput.value = ''; return;
        }

        const headerLine = lines[0];
        const headersFromCsv = parseCsvLine(headerLine).map(h => h.trim().toLowerCase());
        const idColIdx = headersFromCsv.indexOf('id');
        const nameColIdx = headersFromCsv.indexOf('nombre');

        if (nameColIdx === -1) {
            alert(`Encabezado requerido 'Nombre' no encontrado en el CSV de integrantes. Encontrados: ${headersFromCsv.join(', ')}`);
            fileInput.value = ''; return;
        }

        let importedCount = 0, updatedCount = 0, skippedCount = 0;

        for (let i = 1; i < lines.length; i++) {
            const values = parseCsvLine(lines[i]);
            const rawName = values[nameColIdx]?.trim().toUpperCase();

            if (!rawName) {
                console.warn(`Fila ${i+1} (integrantes) omitida: Nombre está vacío.`);
                skippedCount++; continue;
            }

            const csvIdStr = (idColIdx !== -1) ? values[idColIdx]?.trim() : null;
            let csvId: number | null = null;
            if (csvIdStr) {
                const parsed = parseInt(csvIdStr, 10);
                if (!isNaN(parsed) && parsed > 0) csvId = parsed;
                else console.warn(`Fila ${i+1} (integrantes): ID '${csvIdStr}' inválido. Se tratará como nuevo si el nombre es único.`);
            }

            if (csvId !== null) { 
                const existingIntegrante = integrantes.find(inte => inte.id === csvId);
                if (existingIntegrante) { 
                    if (existingIntegrante.nombre.toUpperCase() !== rawName) {
                        if (integrantes.some(inte => inte.id !== csvId && inte.nombre.toUpperCase() === rawName)) {
                            console.warn(`Fila ${i+1} (integrantes) omitida: Nuevo nombre '${rawName}' para ID ${csvId} ya existe con otro ID.`);
                            skippedCount++;
                        } else {
                            existingIntegrante.nombre = rawName;
                            updatedCount++;
                        }
                    } 
                } else { 
                    if (integrantes.some(inte => inte.nombre.toUpperCase() === rawName)) {
                        console.warn(`Fila ${i+1} (integrantes) omitida: Nombre '${rawName}' para nuevo ID ${csvId} ya existe.`);
                        skippedCount++;
                    } else {
                        integrantes.push({ id: csvId, nombre: rawName });
                        nextIntegranteId = Math.max(nextIntegranteId, csvId + 1);
                        importedCount++;
                    }
                }
            } else { 
                if (integrantes.some(inte => inte.nombre.toUpperCase() === rawName)) {
                    console.warn(`Fila ${i+1} (integrantes) omitida: Nombre '${rawName}' ya existe (sin ID válido).`);
                    skippedCount++;
                } else {
                    integrantes.push({ id: nextIntegranteId++, nombre: rawName });
                    importedCount++;
                }
            }
        }
        if (importedCount > 0 || updatedCount > 0) saveIntegrantesToLocalStorage();
        alert(`Integrantes importados: ${importedCount}, actualizados: ${updatedCount}, omitidos: ${skippedCount}. Revise consola para detalles.`);
        fileInput.value = '';
        renderApp();
    };
    reader.onerror = () => { alert('Error al leer el archivo CSV de integrantes.'); fileInput.value = ''; };
    reader.readAsText(file);
}


function renderIntegrantesScreen(parentElement: HTMLElement): void {
    const header = document.createElement('h2');
    header.className = 'section-header';
    header.textContent = 'Gestión de Integrantes';
    parentElement.appendChild(header);

    const csvActionsContainer = document.createElement('div');
    csvActionsContainer.className = 'import-export-actions section-import-export';

    const importButtonCsv = document.createElement('button');
    importButtonCsv.textContent = 'Importar CSV (Integrantes)';
    importButtonCsv.className = 'csv-action-button';
    importButtonCsv.onclick = () => document.getElementById(INTEGRANTE_CSV_FILE_INPUT_ID)?.click();
    csvActionsContainer.appendChild(importButtonCsv);

    const exportButtonCsv = document.createElement('button');
    exportButtonCsv.textContent = 'Exportar CSV (Integrantes)';
    exportButtonCsv.className = 'csv-action-button';
    exportButtonCsv.onclick = handleExportIntegrantesCSV;
    csvActionsContainer.appendChild(exportButtonCsv);

    const csvFileInput = document.createElement('input');
    csvFileInput.type = 'file';
    csvFileInput.id = INTEGRANTE_CSV_FILE_INPUT_ID;
    csvFileInput.accept = '.csv';
    csvFileInput.style.display = 'none';
    csvFileInput.onchange = handleImportIntegrantesCSVFile;
    csvActionsContainer.appendChild(csvFileInput);
    parentElement.appendChild(csvActionsContainer);


    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', 'Buscar integrante...');
    searchInput.className = 'razon-input search-razon-input';
    searchInput.id = INTEGRANTE_SEARCH_INPUT_ID;
    searchInput.value = integrantesSearchTerm;
    searchInput.oninput = (e) => {
        const inputElement = e.target as HTMLInputElement;
        integrantesSearchTerm = inputElement.value;
        renderApp();
        focusTargetId = INTEGRANTE_SEARCH_INPUT_ID;
    };
    searchInput.onfocus = () => {
        focusTargetId = INTEGRANTE_SEARCH_INPUT_ID;
    };
    searchContainer.appendChild(searchInput);
    parentElement.appendChild(searchContainer);

    const addForm = document.createElement('div');
    addForm.className = 'razon-form add-form';
    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('placeholder', 'Nombre del nuevo integrante');
    newInput.className = 'razon-input';
    newInput.value = newIntegranteInputText;
    newInput.oninput = (e) => newIntegranteInputText = (e.target as HTMLInputElement).value;

    const addButton = document.createElement('button');
    addButton.textContent = 'Agregar Integrante';
    addButton.className = 'nav-button primary-button';
    addButton.onclick = () => {
        const trimmedText = newIntegranteInputText.trim().toUpperCase();
        if (trimmedText) {
            if (integrantes.some(i => i.nombre.toUpperCase() === trimmedText)) {
                alert('Este integrante ya existe.');
                return;
            }
            integrantes.push({ id: nextIntegranteId++, nombre: trimmedText });
            saveIntegrantesToLocalStorage();
            newIntegranteInputText = '';
            editingIntegranteId = null;
            renderApp();
        } else {
            alert('El nombre no puede estar vacío.');
        }
    };
    addForm.appendChild(newInput);
    addForm.appendChild(addButton);
    parentElement.appendChild(addForm);

    const sortContainer = document.createElement('div');
    sortContainer.className = 'sort-controls-container';
    const sortLabel = document.createElement('label');
    sortLabel.setAttribute('for', 'integrante-sort-select');
    sortLabel.textContent = 'Ordenar por:';
    sortLabel.className = 'sort-label';

    const sortSelect = document.createElement('select');
    sortSelect.id = 'integrante-sort-select';
    sortSelect.className = 'sort-select form-input';
    sortSelect.value = integrantesSortOrder;
    sortSelect.onchange = (e) => {
        integrantesSortOrder = (e.target as HTMLSelectElement).value as typeof integrantesSortOrder;
        renderApp();
    };

    const sortOptions = [
        { value: 'alpha_asc', text: 'Alfabético (A-Z)' },
        { value: 'alpha_desc', text: 'Alfabético (Z-A)' },
        { value: 'id_asc', text: 'ID (Ascendente)' },
        { value: 'id_desc', text: 'ID (Descendente)' }
    ];

    sortOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        if (integrantesSortOrder === opt.value) option.selected = true;
        sortSelect.appendChild(option);
    });
    sortContainer.appendChild(sortLabel);
    sortContainer.appendChild(sortSelect);
    parentElement.appendChild(sortContainer);


    const listContainer = document.createElement('ul');
    listContainer.className = 'razones-list';
    let filteredIntegrantes = integrantes.filter(integrante =>
        integrante.nombre.toLowerCase().includes(integrantesSearchTerm.toLowerCase())
    );

    const sortedIntegrantes = [...filteredIntegrantes]; 
    switch (integrantesSortOrder) {
        case 'id_asc':
            sortedIntegrantes.sort((a, b) => a.id - b.id);
            break;
        case 'id_desc':
            sortedIntegrantes.sort((a, b) => b.id - a.id);
            break;
        case 'alpha_asc':
            sortedIntegrantes.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'alpha_desc':
            sortedIntegrantes.sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
    }

    sortedIntegrantes.forEach(integrante => {
        const listItem = document.createElement('li');
        listItem.className = 'razon-item';
        if (editingIntegranteId === integrante.id) {
            const editInput = document.createElement('input');
            editInput.setAttribute('type', 'text');
            editInput.className = 'razon-input';
            editInput.value = editIntegranteInputText;
            editInput.oninput = (e) => editIntegranteInputText = (e.target as HTMLInputElement).value;
            const EDIT_INPUT_ID = `edit-integrante-${integrante.id}`;
            editInput.id = EDIT_INPUT_ID;
            focusTargetId = EDIT_INPUT_ID;


            const saveButton = document.createElement('button');
            saveButton.textContent = 'Guardar';
            saveButton.className = 'nav-button action-button-inline success-button';
            saveButton.onclick = () => {
                const trimmedEditText = editIntegranteInputText.trim().toUpperCase();
                if (trimmedEditText) {
                    if (integrantes.some(i => i.nombre.toUpperCase() === trimmedEditText && i.id !== integrante.id)) {
                        alert('Ya existe otro integrante con este nombre.');
                        return;
                    }
                    const index = integrantes.findIndex(i => i.id === integrante.id);
                    if (index !== -1) {
                        integrantes[index].nombre = trimmedEditText;
                        saveIntegrantesToLocalStorage();
                    }
                    editingIntegranteId = null;
                    renderApp();
                } else {
                     alert('El nombre no puede estar vacío.');
                }
            };
            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'Cancelar';
            cancelButton.className = 'nav-button action-button-inline danger-button';
            cancelButton.onclick = () => {
                editingIntegranteId = null;
                renderApp();
            };
            listItem.appendChild(editInput); listItem.appendChild(saveButton); listItem.appendChild(cancelButton);
        } else {
            const textSpan = document.createElement('span');
            textSpan.className = 'razon-text';
            textSpan.textContent = `${integrante.id}. ${integrante.nombre}`;
            const actionsContainer = document.createElement('div');
            actionsContainer.className = 'list-item-actions';
            const editButton = document.createElement('button');
            editButton.innerHTML = ICONS.edit;
            editButton.className = 'icon-button edit-icon-button';
            editButton.setAttribute('aria-label', 'Editar Integrante');
            editButton.onclick = () => {
                editingIntegranteId = integrante.id;
                editIntegranteInputText = integrante.nombre;
                renderApp();
            };
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = ICONS.delete;
            deleteButton.className = 'icon-button delete-icon-button';
            deleteButton.setAttribute('aria-label', 'Eliminar Integrante');
            deleteButton.onclick = () => {
                if (financialRecords.some(fr => fr.integranteId === integrante.id)) {
                    alert(`No se puede eliminar al integrante "${integrante.nombre}" porque está referenciado en registros financieros.`);
                    return;
                }
                if (window.confirm(`¿Está seguro de que desea eliminar al integrante "${integrante.nombre}" (ID: ${integrante.id})?`)) {
                    integrantes = integrantes.filter(i => i.id !== integrante.id);
                    saveIntegrantesToLocalStorage();
                     if (editingIntegranteId === integrante.id) editingIntegranteId = null;
                    renderApp();
                }
            };
            actionsContainer.appendChild(editButton); actionsContainer.appendChild(deleteButton);
            listItem.appendChild(textSpan); listItem.appendChild(actionsContainer);
        }
        listContainer.appendChild(listItem);
    });
    parentElement.appendChild(listContainer);
}

// Initial render
renderApp();