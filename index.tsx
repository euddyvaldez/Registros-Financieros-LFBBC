
import { GoogleGenAI } from "@google/genai"; // Added for potential future use, not used in this iteration.

interface Razon {
    id: number;
    descripcion: string;
    isQuickReason: boolean;
}

const initialRazonesData: Razon[] = [
    { id: 1,  descripcion: "SEMANAL", isQuickReason: false },
    { id: 2,  descripcion: "MENSUALIDAD", isQuickReason: false },
    { id: 3,  descripcion: "APORTE EXTRA", isQuickReason: false },
    { id: 4,  descripcion: "NEVERITA", isQuickReason: false },
    { id: 5,  descripcion: "BOTELLON", isQuickReason: false },
    { id: 6,  descripcion: "AGUA", isQuickReason: false },
    { id: 7,  descripcion: "HIELO", isQuickReason: false },
    { id: 8,  descripcion: "MALLA", isQuickReason: false },
    { id: 9,  descripcion: "BOLA BASKET", isQuickReason: false },
    { id: 10, descripcion: "PITO (SILBATO)", isQuickReason: false },
    { id: 11, descripcion: "JARRON DE AGUA", isQuickReason: false },
    { id: 12, descripcion: "PITILLO", isQuickReason: false },
    { id: 13, descripcion: "VASO PLASTICOS", isQuickReason: false },
    { id: 14, descripcion: "MEDIDOR DE PRESION", isQuickReason: false },
    { id: 15, descripcion: "ARBITRO (PITO)", isQuickReason: false },
    { id: 16, descripcion: "TERMOS PERSONALIZADOS", isQuickReason: false },
    { id: 17, descripcion: "MEDALLAS", isQuickReason: false },
    { id: 18, descripcion: "TORNEO NAVIDEÑO 2023", isQuickReason: false },
    { id: 19, descripcion: "COMBUSTIBLE", isQuickReason: false },
    { id: 20, descripcion: "TERMO DE AGUA GRANDE", isQuickReason: false },
    { id: 21, descripcion: "SUAPE Y ESCOBA", isQuickReason: false },
    { id: 22, descripcion: "1ER UNIFORME REVERSIBLE SUBLIMADO", isQuickReason: false },
    { id: 23, descripcion: "MARCADORES (PARA LA PIZARRA)", isQuickReason: false },
    { id: 24, descripcion: "APP ESTADISTICAS (mensualidad)", isQuickReason: false },
    { id: 25, descripcion: "FORMULARIO ESTADISTICAS", isQuickReason: false },
    { id: 26, descripcion: "BOLETAS VOTACION CAPITANES", isQuickReason: false },
    { id: 27, descripcion: "DONACIONES", isQuickReason: false },
    { id: 28, descripcion: "ALQUILAR CANCHA", isQuickReason: false },
    { id: 29, descripcion: "TORNEO ANIVERSARIO 2024", isQuickReason: false },
    { id: 30, descripcion: "REFRIGERIO", isQuickReason: false },
    { id: 31, descripcion: "CRONOMETRO", isQuickReason: false },
    { id: 32, descripcion: "CORCHA (ESPONJA)", isQuickReason: false },
    { id: 33, descripcion: "FOGUEO", isQuickReason: false },
    { id: 34, descripcion: "FARDOS DE AGUA", isQuickReason: false },
    { id: 35, descripcion: "CERVEZAS ONE", isQuickReason: false },
    { id: 36, descripcion: "TRANSPORTE", isQuickReason: false },
    { id: 37, descripcion: "ACTIVIDAD FIN DE AÑO 2024", isQuickReason: false },
    { id: 38, descripcion: "INYECCION DE CAPITAL", isQuickReason: false },
    { id: 39, descripcion: "REPOSICION DE CAPITAL", isQuickReason: false },
    { id: 40, descripcion: "TORNEO ANIVERSARIO 2025", isQuickReason: false }
];

let razones: Razon[] = [];
try {
    const storedRazones = localStorage.getItem('razonesData');
    if (storedRazones) {
        razones = JSON.parse(storedRazones).map((r: any) => ({
            id: r.id,
            descripcion: String(r.descripcion || '').toUpperCase(),
            isQuickReason: typeof r.isQuickReason === 'boolean' ? r.isQuickReason : false
        }));
    } else {
        razones = initialRazonesData.map(r => ({ ...r, descripcion: r.descripcion.toUpperCase() }));
    }
} catch (e) {
    console.error("Error loading razones from localStorage", e);
    razones = initialRazonesData.map(r => ({ ...r, descripcion: r.descripcion.toUpperCase() }));
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
        integrantes = initialIntegrantesData.map(i => ({ id: i.id, nombre: i.nombre.toUpperCase() }));
    }
} catch (e) {
    console.error("Error loading integrantes from localStorage", e);
    integrantes = initialIntegrantesData.map(i => ({ id: i.id, nombre: i.nombre.toUpperCase() }));
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

// --- Quick Record State ---
let quickRazonesAvailable: Razon[] = [];

function updateQuickRazonesAvailable() {
    quickRazonesAvailable = razones.filter(r => r.isQuickReason)
        .sort((a, b) => {
            const descA = normalizeStringForComparison(a.descripcion);
            const descB = normalizeStringForComparison(b.descripcion);
            if (descA === "MENSUALIDAD") return -1;
            if (descB === "MENSUALIDAD") return 1;
            if (descA === "SEMANAL") return -1;
            if (descB === "SEMANAL") return 1;
            return a.descripcion.localeCompare(b.descripcion);
        });
}
// Initial population
updateQuickRazonesAvailable();


let quickRecordFecha: string = new Date().toISOString().split('T')[0];
let quickRecordRazonId: number | null = null; // Will be set by setDefaultQuickRecordRazonId
let quickRecordMonto: string = '100';
let quickRecordIntegranteId: number | null = null;
let quickRecordMovimiento: 'INGRESOS' | 'GASTOS' | 'INVERSION' = 'INGRESOS';
let quickRecordIntegranteSearchText: string = '';
let quickRecordIntegranteSelectedName: string = '';
let quickRecordFocusTargetId: string | null = null;
let quickRecordMainContentScrollTop: number | null = null;

function setDefaultQuickRecordRazonId() {
    const mensualidadQuick = quickRazonesAvailable.find(r => normalizeStringForComparison(r.descripcion) === "MENSUALIDAD");
    const semanalQuick = quickRazonesAvailable.find(r => normalizeStringForComparison(r.descripcion) === "SEMANAL");

    if (mensualidadQuick) {
        quickRecordRazonId = mensualidadQuick.id;
    } else if (semanalQuick) {
        quickRecordRazonId = semanalQuick.id;
    } else if (quickRazonesAvailable.length > 0) {
        quickRecordRazonId = quickRazonesAvailable[0].id;
    } else {
        quickRecordRazonId = null;
    }
}
setDefaultQuickRecordRazonId();


let focusTargetId: string | null = null;
let mainContentScrollTop: number | null = null; // For scroll preservation

// --- Dashboard Chart State (now for Financial Panel) ---
type DashboardViewType = 'annual_summary' | 'monthly_trend' | 'daily_trend';
let dashboardViewType: DashboardViewType = 'monthly_trend';
let dashboardSelectedYear: number | 'all_available' = 'all_available';
let dashboardSelectedMonth: number = new Date().getMonth() + 1; // 1-12, used for daily_trend
type FinancialPanelChartType = 'line' | 'bar' | 'pie';
let financialPanelChartType: FinancialPanelChartType = 'line';


// --- Financial Quotes State ---
let currentQuoteIndex = 0;
let quoteIntervalId: number | null = null;
const financialQuotes = [
    { text: "No ahorres lo que te queda después de gastar, gasta lo que te queda después de ahorrar.", author: "Warren Buffett" },
    { text: "El dinero es un amo terrible pero un excelente sirviente.", author: "P.T. Barnum" },
    { text: "La inversión en conocimiento paga el mejor interés.", author: "Benjamin Franklin" },
    { text: "Cuida de los pequeños gastos; un pequeño agujero hunde un barco.", author: "Benjamin Franklin" },
    { text: "Demasiadas personas gastan dinero que no han ganado, para comprar cosas que no quieren, para impresionar a personas que no les caen bien.", author: "Will Rogers" },
    { text: "La regla No. 1 es no perder dinero. La regla No. 2 es no olvidar la Regla No. 1.", author: "Warren Buffett"},
    { text: "Una finanza personal sana empieza por gastar menos de lo que ganas.", author: "Anónimo"},
    { text: "El presupuesto es decirle a tu dinero a dónde ir, en lugar de preguntarte a dónde se fue.", author: "Dave Ramsey"}
];


// --- End Financial Records State ---

let currentView = 'dashboard'; // 'dashboard', 'quick_record', 'financial_panel', 'records', 'razones', or 'integrantes'

// --- Financial Import State ---
let showFinancialImportOptions: boolean = false;
let financialImportMode: 'replace' | 'append' = 'append';

// --- Razones Import State ---
let showRazonImportOptions: boolean = false;
let razonImportMode: 'replace' | 'append' = 'append';

// --- Integrantes Import State ---
let showIntegranteImportOptions: boolean = false;
let integranteImportMode: 'replace' | 'append' = 'append';

// --- Dashboard State ---
let balanceVisible: boolean = true;

// --- Records Filter State ---
let recordFilterText: string = '';
type RecordFilterField = 'fecha' | 'integrante' | 'movimiento' | 'razon' | 'descripcion';
let recordFilterField: RecordFilterField = 'descripcion';


// --- Theme State ---
type Theme = 'light' | 'dark';
let currentTheme: Theme = 'light';


const appRoot = document.getElementById('app');
const RAZON_SEARCH_INPUT_ID = 'razon-search-input-field';
const INTEGRANTE_SEARCH_INPUT_ID = 'integrante-search-input-field';
const CSV_FILE_INPUT_ID = 'csv-file-input';
const RAZON_CSV_FILE_INPUT_ID = 'razon-csv-file-input';
const INTEGRANTE_CSV_FILE_INPUT_ID = 'integrante-csv-file-input';

const RECORD_INTEGRANTE_FILTER_INPUT_ID = 'record-integrante-filter-input';
const RECORD_RAZON_FILTER_INPUT_ID = 'record-razon-filter-input';
const QUICK_RECORD_INTEGRANTE_FILTER_INPUT_ID = 'quick-record-integrante-filter-input';

const RECORD_FILTER_TEXT_INPUT_ID = 'record-filter-text-input';
const RECORD_FILTER_FIELD_SELECT_ID = 'record-filter-field-select';

// IDs for dynamic list UL elements
const RECORD_INTEGRANTE_SELECT_LIST_ID = 'record-integrante-select-list';
const RECORD_RAZON_SELECT_LIST_ID = 'record-razon-select-list';
const QUICK_RECORD_INTEGRANTE_SELECT_LIST_ID = 'quick-record-integrante-select-list';
const RAZONES_LIST_CONTAINER_ID = 'razones-list-container-ul';
const INTEGRANTES_LIST_CONTAINER_ID = 'integrantes-list-container-ul';


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
    quick: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
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
    `,
    moon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
    `,
    sun: `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
    `
};

const CHART_COLORS = {
    ingresos: '#4CAF50', // Green
    gastos: '#FF3B30',   // Red
    inversion: '#FFC107', // Amber/Yellow
    balance: '#007AFF',  // Blue
    defaultLine: '#8E8E93' // Grey for axes or neutral elements
};

function loadTheme() {
    const savedTheme = localStorage.getItem('appTheme') as Theme | null;
    if (savedTheme) {
        currentTheme = savedTheme;
    }
    document.body.className = currentTheme === 'dark' ? 'dark-theme' : '';
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('appTheme', currentTheme);
    document.body.className = currentTheme === 'dark' ? 'dark-theme' : '';
    renderApp(); // Re-render to update theme-dependent elements like icons
}


function normalizeStringForComparison(str: string): string {
    if (str === null || str === undefined) return ''; // Ensure null/undefined become empty string
    // Basic accent removal for Spanish vowels and N, and convert to uppercase
    return String(str).trim().toUpperCase() // Ensure str is treated as string
        .replace(/Á/g, 'A')
        .replace(/É/g, 'E')
        .replace(/Í/g, 'I')
        .replace(/Ó/g, 'O')
        .replace(/Ú/g, 'U')
        .replace(/Ñ/g, 'N');
}


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
        nextReasonId = razones.length > 0 ? Math.max(0, ...razones.map(r => r.id)) + 1 : 1;
        updateQuickRazonesAvailable();
        setDefaultQuickRecordRazonId();
    } catch (e) {
        console.error("Error saving razones to localStorage", e);
        alert("Error: No se pudieron guardar las razones. El almacenamiento local puede estar lleno o deshabilitado.");
    }
}

function saveIntegrantesToLocalStorage() {
    try {
        localStorage.setItem('integrantesData', JSON.stringify(integrantes));
        nextIntegranteId = integrantes.length > 0 ? Math.max(0, ...integrantes.map(i => i.id)) + 1 : 1;
    } catch (e)        {
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
    updateQuickRazonesAvailable();
    setDefaultQuickRecordRazonId();


    const appHeaderDiv = document.createElement('div');
    appHeaderDiv.className = 'app-global-header';

    const logoImg = document.createElement('img');
    logoImg.src = 'https://i.postimg.cc/MMMG2PD5/los-forasteros-03.png'; // Updated logo URL
    logoImg.alt = 'LFBBC Logo';
    logoImg.className = 'app-global-logo';
    appHeaderDiv.appendChild(logoImg);

    const appTitleSpan = document.createElement('span');
    appTitleSpan.className = 'app-global-title';
    appTitleSpan.textContent = 'Registros Financieros LFBBC';
    appHeaderDiv.appendChild(appTitleSpan);

    const themeToggleButton = document.createElement('button');
    themeToggleButton.id = 'theme-toggle-button';
    themeToggleButton.className = 'theme-toggle-button';
    themeToggleButton.setAttribute('aria-label', `Cambiar a tema ${currentTheme === 'light' ? 'oscuro' : 'claro'}`);
    themeToggleButton.innerHTML = currentTheme === 'light' ? ICONS.moon : ICONS.sun;
    themeToggleButton.onclick = toggleTheme;
    appHeaderDiv.appendChild(themeToggleButton);


    appRoot.appendChild(appHeaderDiv);

    const mainContentElement = document.createElement('div');
    mainContentElement.id = 'main-content-area';
    appRoot.appendChild(mainContentElement);

    if (currentView === 'dashboard') {
        renderDashboardScreen(mainContentElement);
    } else if (currentView === 'quick_record') {
        renderQuickRecordScreen(mainContentElement);
    } else if (currentView === 'financial_panel') {
        renderFinancialPanelScreen(mainContentElement);
    } else if (currentView === 'records') {
        renderRecordsScreen(mainContentElement);
    } else if (currentView === 'razones') {
        renderRazonesScreen(mainContentElement);
    } else if (currentView === 'integrantes') {
        renderIntegrantesScreen(mainContentElement);
    }

    renderBottomNavigation(appRoot);

    const currentMainContentArea = document.getElementById('main-content-area');
    let scrollPositionToRestore = mainContentScrollTop;
    let focusTargetToRestore = focusTargetId;

    if (currentView === 'quick_record') {
        scrollPositionToRestore = quickRecordMainContentScrollTop;
        focusTargetToRestore = quickRecordFocusTargetId;
    }

    if (scrollPositionToRestore !== null && currentMainContentArea) {
        requestAnimationFrame(() => {
            currentMainContentArea.scrollTop = scrollPositionToRestore!;
            if (currentView === 'quick_record') {
                quickRecordMainContentScrollTop = null;
            } else {
                mainContentScrollTop = null;
            }
        });
    } else {
         if (currentView === 'quick_record') {
            quickRecordMainContentScrollTop = null;
         } else {
            mainContentScrollTop = null;
         }
    }

    if (focusTargetToRestore) {
        const elementToFocus = document.getElementById(focusTargetToRestore);
        if (elementToFocus instanceof HTMLInputElement || elementToFocus instanceof HTMLTextAreaElement || elementToFocus instanceof HTMLSelectElement) {
            requestAnimationFrame(() => { // RAF 1 (for focus)
                elementToFocus.focus();
                if (elementToFocus instanceof HTMLInputElement && typeof elementToFocus.value === 'string') {
                    // Use another RAF for setSelectionRange for better sync with browser rendering pipeline
                    requestAnimationFrame(() => { // RAF 2 (for selectionRange)
                        // Ensure element is still focused before trying to set selection
                        if (document.activeElement === elementToFocus) {
                            try {
                                elementToFocus.setSelectionRange(elementToFocus.value.length, elementToFocus.value.length);
                            } catch (e) {
                                // Ignore errors, e.g. if input type doesn't support setSelectionRange or element lost focus unexpectedly
                            }
                        }
                    });
                }
            });
        }
        if (currentView === 'quick_record') {
            quickRecordFocusTargetId = null;
        } else {
            focusTargetId = null;
        }
    } else {
        if (currentView === 'quick_record') {
            quickRecordFocusTargetId = null;
         } else {
            focusTargetId = null;
         }
    }
}

function renderBottomNavigation(parentElement: HTMLElement): void {
    const nav = document.createElement('nav');
    nav.className = 'bottom-nav';

    const navItems = [
        { view: 'dashboard', label: 'Inicio', icon: ICONS.home },
        { view: 'quick_record', label: 'Rápido', icon: ICONS.quick },
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
            if (currentView === 'dashboard' && item.view !== 'dashboard' && quoteIntervalId !== null) {
                window.clearInterval(quoteIntervalId);
                quoteIntervalId = null;
            }
            if (currentView === 'razones' && item.view !== 'razones') {
                editingReasonId = null;
                razonesSearchTerm = '';
                newReasonInputText = '';
                editReasonInputText = '';
                showRazonImportOptions = false;
            }
            if (currentView === 'integrantes' && item.view !== 'integrantes') {
                editingIntegranteId = null;
                integrantesSearchTerm = '';
                newIntegranteInputText = '';
                editIntegranteInputText = '';
                showIntegranteImportOptions = false;
            }
             if (currentView === 'records' && item.view !== 'records') {
                newRecordIntegranteSearchText = '';
                newRecordIntegranteSelectedName = '';
                newRecordRazonSearchText = '';
                newRecordRazonSelectedDescripcion = '';
                showFinancialImportOptions = false;
                recordFilterText = '';
            }
            if (currentView === 'quick_record' && item.view !== 'quick_record') {
                quickRecordIntegranteSearchText = '';
                quickRecordIntegranteSelectedName = '';
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
    gastos: number;
    inversion: number;
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
            else if (r.movimiento === 'GASTOS') yearlyData[year].gastos += Math.abs(r.monto); // Ensure positive for chart
            else if (r.movimiento === 'INVERSION') yearlyData[year].inversion += Math.abs(r.monto); // Ensure positive for chart
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
                else if (r.movimiento === 'GASTOS') monthlyData[recordMonth].gastos += Math.abs(r.monto); // Ensure positive for chart
                else if (r.movimiento === 'INVERSION') monthlyData[recordMonth].inversion += Math.abs(r.monto); // Ensure positive for chart
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
                else if (r.movimiento === 'GASTOS') dailyData[day].gastos += Math.abs(r.monto); // Ensure positive for chart
                else if (r.movimiento === 'INVERSION') dailyData[day].inversion += Math.abs(r.monto); // Ensure positive for chart
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

    (['ingresos', 'gastos', 'inversion'] as const).forEach(type => {
        if (data.every(d => d[type] === 0)) return;

        const path = document.createElementNS(svgNS, 'path');
        const dAttr = data.map((d, i) =>
            `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d[type])}`
        ).join(' ');
        path.setAttribute('d', dAttr);
        path.setAttribute('stroke', CHART_COLORS[type]);
        path.setAttribute('fill', 'none');
        path.classList.add('chart-line');
        svg.appendChild(path);

        data.forEach((d, i) => {
            if (d[type] > 0 || (d[type] === 0 && data.some(dp => dp[type] > 0))) { // Draw point if value > 0 or if it's 0 but other points for this type exist
                const circle = document.createElementNS(svgNS, 'circle');
                circle.setAttribute('cx', String(xScale(i)));
                circle.setAttribute('cy', String(yScale(d[type])));
                circle.setAttribute('r', '3');
                circle.setAttribute('fill', CHART_COLORS[type]);
                circle.classList.add('chart-point');
                svg.appendChild(circle);
            }
        });
    });

    const legendContainer = document.createElement('div');
    legendContainer.className = 'chart-legend';
    (['ingresos', 'gastos', 'inversion'] as const).forEach(type => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        const colorBox = document.createElement('span');
        colorBox.className = 'legend-color-box';
        colorBox.style.backgroundColor = CHART_COLORS[type];
        const text = document.createElement('span');
        text.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        legendItem.appendChild(colorBox);
        legendItem.appendChild(text);
        legendContainer.appendChild(legendItem);
    });

    parentElement.appendChild(svg);
    parentElement.appendChild(legendContainer);
}

function renderBarChartSVG(parentElement: HTMLElement, data: ProcessedChartDataPoint[]): void {
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
    svg.classList.add('trend-chart-svg'); // Re-use class for basic sizing

    const maxValue = Math.max(10, ...data.flatMap(d => [d.ingresos, d.gastos, d.inversion]));
    const yScale = (value: number) => margin.top + graphHeight - (value / maxValue) * graphHeight;

    // X-axis and Y-axis lines and labels (similar to line chart)
    const xAxisLine = document.createElementNS(svgNS, 'line');
    xAxisLine.setAttribute('x1', String(margin.left));
    xAxisLine.setAttribute('y1', String(margin.top + graphHeight));
    xAxisLine.setAttribute('x2', String(margin.left + graphWidth));
    xAxisLine.setAttribute('y2', String(margin.top + graphHeight));
    xAxisLine.classList.add('chart-axis');
    svg.appendChild(xAxisLine);

    const yAxisLine = document.createElementNS(svgNS, 'line');
    yAxisLine.setAttribute('x1', String(margin.left));
    yAxisLine.setAttribute('y1', String(margin.top));
    yAxisLine.setAttribute('x2', String(margin.left));
    yAxisLine.setAttribute('y2', String(margin.top + graphHeight));
    yAxisLine.classList.add('chart-axis');
    svg.appendChild(yAxisLine);

    const numGroups = data.length;
    const groupWidth = graphWidth / numGroups;
    const barPadding = 0.2; // Percentage of groupWidth for padding between groups
    const barAreaWidth = groupWidth * (1 - barPadding);
    const numBarsPerGroup = 3; // Ingresos, Gastos, Inversion
    const barWidth = barAreaWidth / numBarsPerGroup;

    data.forEach((d, i) => {
        const groupX = margin.left + (groupWidth * i) + (groupWidth * barPadding / 2);

        // X-axis label for group
        const xLabel = document.createElementNS(svgNS, 'text');
        xLabel.setAttribute('x', String(groupX + barAreaWidth / 2));
        xLabel.setAttribute('y', String(margin.top + graphHeight + 20));
        xLabel.textContent = d.label;
        xLabel.classList.add('chart-label', 'x-axis-label');
        svg.appendChild(xLabel);

        // Bars for Ingresos, Gastos, Inversion
        (['ingresos', 'gastos', 'inversion'] as const).forEach((type, barIndex) => {
            if (d[type] > 0) {
                const rect = document.createElementNS(svgNS, 'rect');
                const barX = groupX + (barWidth * barIndex);
                rect.setAttribute('x', String(barX));
                rect.setAttribute('y', String(yScale(d[type])));
                rect.setAttribute('width', String(barWidth * 0.9)); // Slight padding between bars in a group
                rect.setAttribute('height', String(graphHeight - (yScale(d[type]) - margin.top) ));
                rect.setAttribute('fill', CHART_COLORS[type]);
                svg.appendChild(rect);
            }
        });
    });

    // Y-axis ticks and labels
    const yTicks = 5;
    for (let i = 0; i <= yTicks; i++) {
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

    // Legend (same as line chart)
    const legendContainer = document.createElement('div');
    legendContainer.className = 'chart-legend';
    (['ingresos', 'gastos', 'inversion'] as const).forEach(type => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        const colorBox = document.createElement('span');
        colorBox.className = 'legend-color-box';
        colorBox.style.backgroundColor = CHART_COLORS[type];
        const text = document.createElement('span');
        text.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        legendItem.appendChild(colorBox);
        legendItem.appendChild(text);
        legendContainer.appendChild(legendItem);
    });

    parentElement.appendChild(svg);
    parentElement.appendChild(legendContainer);
}

interface PieChartSegment {
    name: string;
    value: number;
    color: string;
}

function renderPieChartSVG(parentElement: HTMLElement, data: PieChartSegment[]): void {
    parentElement.innerHTML = '';

    if (data.length === 0 || data.every(segment => segment.value === 0)) {
        const noDataMsg = document.createElement('p');
        noDataMsg.textContent = 'No hay datos suficientes para mostrar el gráfico de pastel.';
        noDataMsg.className = 'no-data-message';
        parentElement.appendChild(noDataMsg);
        return;
    }

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    const chartWidth = 380; // Make it wider to accommodate legend side-by-side or better text
    const chartHeight = 220; // Slightly less tall as labels might be outside
    const radius = Math.min(chartWidth / 2.5, chartHeight / 2) * 0.8; // Adjusted radius
    const centerX = chartWidth / 2.5; // Center X adjusted for potential legend
    const centerY = chartHeight / 2;

    svg.setAttribute('viewBox', `0 0 ${chartWidth} ${chartHeight}`);
    svg.classList.add('trend-chart-svg');

    const totalValue = data.reduce((sum, segment) => sum + segment.value, 0);
    if (totalValue === 0) {
         const noDataMsg = document.createElement('p');
        noDataMsg.textContent = 'No hay valores positivos para mostrar en el gráfico de pastel.';
        noDataMsg.className = 'no-data-message';
        parentElement.appendChild(noDataMsg);
        return;
    }

    let startAngle = -Math.PI / 2; // Start at 12 o'clock

    const pieGroup = document.createElementNS(svgNS, 'g');
    pieGroup.setAttribute('transform', `translate(${centerX}, ${centerY})`);

    data.forEach(segment => {
        if (segment.value <= 0) return;

        const sliceAngle = (segment.value / totalValue) * 2 * Math.PI;
        const endAngle = startAngle + sliceAngle;

        const x1 = radius * Math.cos(startAngle);
        const y1 = radius * Math.sin(startAngle);
        const x2 = radius * Math.cos(endAngle);
        const y2 = radius * Math.sin(endAngle);

        const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

        const pathData = [
            `M 0 0`, // Move to center
            `L ${x1} ${y1}`, // Line to start of arc
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`, // Arc
            `Z` // Close path (back to center)
        ].join(' ');

        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', segment.color);
        path.classList.add('chart-pie-slice');
        pieGroup.appendChild(path);

        startAngle = endAngle;
    });
    svg.appendChild(pieGroup);

    // Legend for Pie Chart (could be positioned differently)
    const legendContainer = document.createElement('div');
    legendContainer.className = 'chart-legend pie-chart-legend'; // Specific class for pie legend styling

    data.forEach(segment => {
        if (segment.value <= 0) return;
        const percentage = ((segment.value / totalValue) * 100).toFixed(1);
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        const colorBox = document.createElement('span');
        colorBox.className = 'legend-color-box';
        colorBox.style.backgroundColor = segment.color;
        const text = document.createElement('span');
        text.textContent = `${segment.name}: ${percentage}% (RD$${segment.value.toLocaleString('es-DO', {minimumFractionDigits:2, maximumFractionDigits:2})})`;
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
    parentElement.innerHTML = '';

    parentElement.style.display = 'flex';
    parentElement.style.flexDirection = 'column';
    parentElement.style.justifyContent = 'center';
    parentElement.style.alignItems = 'center';
    parentElement.style.textAlign = 'center';
    parentElement.style.gap = '20px';

    const balanceDisplayContainer = document.createElement('div');
    balanceDisplayContainer.className = 'dashboard-balance-display-area';


    if (balanceVisible) {
        let totalIngresos = 0;
        let totalGastos = 0;
        let totalInversion = 0;

        financialRecords.forEach(r => {
            if (r.movimiento === 'INGRESOS') {
                totalIngresos += r.monto;
            } else if (r.movimiento === 'GASTOS') {
                totalGastos += r.monto;
            } else if (r.movimiento === 'INVERSION') {
                totalInversion += r.monto;
            }
        });
        const balanceGeneral = totalIngresos + totalGastos + totalInversion;

        const balanceContainer = document.createElement('div');
        balanceContainer.className = 'dashboard-balance-container';

        const balanceTitle = document.createElement('h2');
        balanceTitle.className = 'dashboard-balance-title';
        balanceTitle.textContent = 'Balance General';

        const balanceValue = document.createElement('p');
        balanceValue.className = 'dashboard-balance-value';
        balanceValue.textContent = `RD$${balanceGeneral.toLocaleString('es-DO', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        if (balanceGeneral >= 0) {
            balanceValue.style.color = CHART_COLORS.ingresos;
        } else {
            balanceValue.style.color = CHART_COLORS.gastos;
        }

        balanceContainer.appendChild(balanceTitle);
        balanceContainer.appendChild(balanceValue);
        balanceDisplayContainer.appendChild(balanceContainer);

    } else {
        const hiddenBalanceInfo = document.createElement('div');
        hiddenBalanceInfo.className = 'dashboard-hidden-balance-info';
        const infoText = document.createElement('p');
        infoText.textContent = "--OCULTO--";
        infoText.style.fontWeight = 'bold';
        infoText.style.fontSize = '1.2em';
        hiddenBalanceInfo.appendChild(infoText);

        const randomQuote = financialQuotes[Math.floor(Math.random() * financialQuotes.length)];
        if (randomQuote) {
            const quoteP = document.createElement('p');
            quoteP.className = 'dashboard-balance-placeholder-quote';
            quoteP.innerHTML = `<em>"${randomQuote.text}"</em><br>- ${randomQuote.author}`;
            hiddenBalanceInfo.appendChild(quoteP);
        }
        balanceDisplayContainer.appendChild(hiddenBalanceInfo);
    }
    parentElement.appendChild(balanceDisplayContainer);

    const toggleBalanceButton = document.createElement('button');
    toggleBalanceButton.className = 'dashboard-toggle-balance-button primary-button';
    toggleBalanceButton.textContent = 'Discreto';
    toggleBalanceButton.onclick = () => {
        balanceVisible = !balanceVisible;
        renderApp();
    };
    parentElement.appendChild(toggleBalanceButton);


    // Financial Quotes Section
    const quoteBox = document.createElement('div');
    quoteBox.className = 'dashboard-quote-box';
    const quoteTextEl = document.createElement('p');
    quoteTextEl.className = 'dashboard-quote-text';
    const quoteAuthorEl = document.createElement('p');
    quoteAuthorEl.className = 'dashboard-quote-author';

    quoteBox.appendChild(quoteTextEl);
    quoteBox.appendChild(quoteAuthorEl);
    parentElement.appendChild(quoteBox);

    function showNextQuote() {
        if (financialQuotes.length === 0) return;
        currentQuoteIndex = (currentQuoteIndex + 1) % financialQuotes.length;
        const quote = financialQuotes[currentQuoteIndex];
        quoteTextEl.textContent = `"${quote.text}"`;
        quoteAuthorEl.textContent = `- ${quote.author}`;
    }

    if (quoteIntervalId !== null) {
        window.clearInterval(quoteIntervalId);
    }

    if (financialQuotes.length > 0) {
        currentQuoteIndex = -1;
        showNextQuote();
        quoteIntervalId = window.setInterval(showNextQuote, 20000);
    } else {
        quoteTextEl.textContent = "No hay frases disponibles en este momento.";
    }
}

function _updateQuickRecordIntegranteList(searchTerm: string) {
    const ul = document.getElementById(QUICK_RECORD_INTEGRANTE_SELECT_LIST_ID) as HTMLUListElement;
    if (!ul) return;
    ul.innerHTML = '';

    const normalizedSearchTerm = normalizeStringForComparison(searchTerm);
    const filtered = searchTerm.trim() === ''
        ? [...integrantes].sort((a,b) => a.nombre.localeCompare(b.nombre))
        : integrantes.filter(inte => normalizeStringForComparison(inte.nombre).includes(normalizedSearchTerm))
                     .sort((a,b) => a.nombre.localeCompare(b.nombre));

    if (filtered.length === 0 && searchTerm.trim() !== '') {
        const noResultItem = document.createElement('li');
        noResultItem.textContent = 'Ningún integrante coincide';
        noResultItem.className = 'selectable-list-item disabled';
        ul.appendChild(noResultItem);
    } else {
        filtered.forEach(integrante => {
            const listItem = document.createElement('li');
            listItem.className = 'selectable-list-item';
            listItem.textContent = integrante.nombre;
            listItem.onclick = () => {
                quickRecordIntegranteId = integrante.id;
                quickRecordIntegranteSelectedName = integrante.nombre;
                
                const mainArea = document.getElementById('main-content-area');
                if (mainArea) quickRecordMainContentScrollTop = mainArea.scrollTop;
                quickRecordFocusTargetId = QUICK_RECORD_INTEGRANTE_FILTER_INPUT_ID;
                renderApp();
            };
            ul.appendChild(listItem);
        });
    }
}

function renderQuickRecordScreen(parentElement: HTMLElement): void {
    const header = document.createElement('h1');
    header.className = 'header-title';
    header.innerHTML = 'Registro Rápido';
    parentElement.appendChild(header);

    const form = document.createElement('form');
    form.className = 'record-form quick-record-form'; // Add specific class for potential styling
    form.onsubmit = (e) => {
        e.preventDefault();
        handleAddQuickRecord();
    };

    // Fecha (Now editable)
    const fechaGroup = document.createElement('div');
    fechaGroup.className = 'form-group';
    const fechaLabel = document.createElement('label');
    fechaLabel.setAttribute('for', 'quick-record-fecha');
    fechaLabel.textContent = 'Fecha:';
    const fechaInput = document.createElement('input');
    fechaInput.type = 'date';
    fechaInput.id = 'quick-record-fecha';
    fechaInput.className = 'form-input';
    fechaInput.value = quickRecordFecha;
    fechaInput.onchange = (e) => quickRecordFecha = (e.target as HTMLInputElement).value;
    fechaGroup.appendChild(fechaLabel);
    fechaGroup.appendChild(fechaInput);
    form.appendChild(fechaGroup);

    // Razón Select
    const razonGroup = document.createElement('div');
    razonGroup.className = 'form-group';
    const razonLabel = document.createElement('label');
    razonLabel.setAttribute('for', 'quick-record-razon');
    razonLabel.textContent = 'Razón:';
    const razonSelect = document.createElement('select');
    razonSelect.id = 'quick-record-razon';
    razonSelect.className = 'form-input';

    if (quickRazonesAvailable.length === 0) {
        const option = document.createElement('option');
        option.textContent = 'Habilite razones en "Gestión de Razones"';
        option.disabled = true;
        razonSelect.appendChild(option);
        razonSelect.disabled = true;
    } else {
        quickRazonesAvailable.forEach(raz => {
            const option = document.createElement('option');
            option.value = String(raz.id);
            option.textContent = raz.descripcion;
            if (quickRecordRazonId === raz.id) option.selected = true;
            razonSelect.appendChild(option);
        });
    }
    razonSelect.onchange = (e) => quickRecordRazonId = parseInt((e.target as HTMLSelectElement).value);
    razonGroup.appendChild(razonLabel);
    razonGroup.appendChild(razonSelect);
    form.appendChild(razonGroup);

    // Monto Input
    const montoGroup = document.createElement('div');
    montoGroup.className = 'form-group';
    const montoLabel = document.createElement('label');
    montoLabel.setAttribute('for', 'quick-record-monto');
    montoLabel.textContent = 'Monto (RD$):';
    const montoInput = document.createElement('input');
    montoInput.type = 'number';
    montoInput.id = 'quick-record-monto';
    montoInput.className = 'form-input';
    montoInput.step = '0.01';
    montoInput.placeholder = '100.00';
    montoInput.value = quickRecordMonto;
    montoInput.oninput = (e) => quickRecordMonto = (e.target as HTMLInputElement).value;
    montoGroup.appendChild(montoLabel);
    montoGroup.appendChild(montoInput);
    form.appendChild(montoGroup);

    // Integrante Selection (reusing logic from renderRecordsScreen)
    const integranteSelectedDisplayGroup = document.createElement('div');
    integranteSelectedDisplayGroup.className = 'form-group';
    const integranteSelectedLabel = document.createElement('label');
    integranteSelectedLabel.setAttribute('for', 'quick-record-integrante-selected-display');
    integranteSelectedLabel.textContent = 'Integrante Seleccionado:';
    const integranteSelectedDisplayInput = document.createElement('input');
    integranteSelectedDisplayInput.type = 'text';
    integranteSelectedDisplayInput.id = 'quick-record-integrante-selected-display';
    integranteSelectedDisplayInput.className = 'form-input selected-item-display';
    integranteSelectedDisplayInput.readOnly = true;
    integranteSelectedDisplayInput.value = quickRecordIntegranteSelectedName || 'Ninguno';
    integranteSelectedDisplayGroup.appendChild(integranteSelectedLabel);
    integranteSelectedDisplayGroup.appendChild(integranteSelectedDisplayInput);
    form.appendChild(integranteSelectedDisplayGroup);

    const integranteFilterGroup = document.createElement('div');
    integranteFilterGroup.className = 'form-group filter-selection-group';
    const integranteFilterLabel = document.createElement('label');
    integranteFilterLabel.setAttribute('for', QUICK_RECORD_INTEGRANTE_FILTER_INPUT_ID);
    integranteFilterLabel.textContent = 'Buscar y Seleccionar Integrante:';
    const integranteFilterInput = document.createElement('input');
    integranteFilterInput.type = 'text';
    integranteFilterInput.id = QUICK_RECORD_INTEGRANTE_FILTER_INPUT_ID;
    integranteFilterInput.className = 'form-input';
    integranteFilterInput.placeholder = 'Escriba para filtrar integrantes...';
    integranteFilterInput.value = quickRecordIntegranteSearchText;
    integranteFilterInput.autocomplete = 'off';
    integranteFilterInput.oninput = (e) => {
        quickRecordIntegranteSearchText = (e.target as HTMLInputElement).value;
        _updateQuickRecordIntegranteList(quickRecordIntegranteSearchText);
    };
    integranteFilterGroup.appendChild(integranteFilterLabel);
    integranteFilterGroup.appendChild(integranteFilterInput);

    const integranteListWrapper = document.createElement('div');
    integranteListWrapper.className = 'selectable-list-wrapper';
    const integranteUl = document.createElement('ul');
    integranteUl.id = QUICK_RECORD_INTEGRANTE_SELECT_LIST_ID;
    integranteUl.className = 'selectable-list';
    
    integranteListWrapper.appendChild(integranteUl);
    integranteFilterGroup.appendChild(integranteListWrapper);
    form.appendChild(integranteFilterGroup);
    
    // Initial population of the list
    _updateQuickRecordIntegranteList(quickRecordIntegranteSearchText);


    // Movimiento Select
    const movimientoGroup = document.createElement('div');
    movimientoGroup.className = 'form-group';
    const movimientoLabel = document.createElement('label');
    movimientoLabel.setAttribute('for', 'quick-record-movimiento');
    movimientoLabel.textContent = 'Movimiento:';
    const movimientoSelect = document.createElement('select');
    movimientoSelect.id = 'quick-record-movimiento';
    movimientoSelect.className = 'form-input';
    movimientoSelect.value = quickRecordMovimiento;
    movimientoSelect.onchange = (e) => quickRecordMovimiento = (e.target as HTMLSelectElement).value as 'INGRESOS' | 'GASTOS' | 'INVERSION';
    ['INGRESOS', 'GASTOS', 'INVERSION'].forEach(mov => {
        const option = document.createElement('option');
        option.value = mov;
        option.textContent = mov.charAt(0) + mov.slice(1).toLowerCase();
        if (quickRecordMovimiento === mov) option.selected = true;
        movimientoSelect.appendChild(option);
    });
    movimientoGroup.appendChild(movimientoLabel);
    movimientoGroup.appendChild(movimientoSelect);
    form.appendChild(movimientoGroup);

    const addButton = document.createElement('button');
    addButton.type = 'submit';
    addButton.textContent = 'Agregar Rápido';
    addButton.className = 'add-record-button primary-button';
    form.appendChild(addButton);

    parentElement.appendChild(form);
}


function handleAddQuickRecord() {
    if (quickRecordRazonId === null || quickRazonesAvailable.length === 0) {
        alert('Por favor, seleccione una Razón válida. Asegúrese de habilitar razones para uso rápido en la pantalla de Razones.');
        return;
    }
    if (quickRecordIntegranteId === null) {
        alert('Por favor, seleccione un Integrante.');
        return;
    }
    const montoValue = parseFloat(quickRecordMonto);
    if (isNaN(montoValue) || quickRecordMonto.trim() === '') {
        alert('El monto debe ser un número válido.');
        return;
    }

    const newRecord: FinancialRecord = {
        id: nextRecordId++,
        fecha: quickRecordFecha, // Already set to current date
        integranteId: quickRecordIntegranteId,
        movimiento: quickRecordMovimiento,
        razonId: quickRecordRazonId,
        descripcion: "", // No description field in quick record
        monto: montoValue
    };

    financialRecords.push(newRecord);
    saveFinancialRecords();

    // Reset quick record form
    quickRecordMonto = '100';
    quickRecordIntegranteId = null;
    quickRecordIntegranteSelectedName = '';
    quickRecordIntegranteSearchText = '';
    quickRecordMovimiento = 'INGRESOS';
    // quickRecordFecha is not reset, to allow multiple entries for the same day easily
    setDefaultQuickRecordRazonId(); // Set default based on availability


    alert('Registro rápido agregado con éxito!');
    renderApp();
}


function renderFinancialPanelScreen(parentElement: HTMLElement): void {
    const header = document.createElement('h1');
    header.className = 'main-header-title';
    header.textContent = 'Panel Financiero';
    parentElement.appendChild(header);

    const summaryCardsContainer = document.createElement('div');
    summaryCardsContainer.className = 'summary-cards-container';

    let totalIngresos = 0;
    let totalGastos = 0;
    let totalInversion = 0;

    financialRecords.forEach(r => {
        if (r.movimiento === 'INGRESOS') {
            totalIngresos += r.monto;
        } else if (r.movimiento === 'GASTOS') {
            totalGastos += r.monto; // Stored as positive
        } else if (r.movimiento === 'INVERSION') {
            totalInversion += r.monto; // Stored as positive
        }
    });

    const balanceGeneral = totalIngresos + totalGastos + totalInversion;

    summaryCardsContainer.appendChild(
        renderSummaryCardComponent('Ingresos Totales', totalIngresos, 'RD$', 'summary-ingresos')
    );
    summaryCardsContainer.appendChild(
        renderSummaryCardComponent('Gastos Totales', totalGastos, 'RD$', 'summary-gastos')
    );
    summaryCardsContainer.appendChild(
        renderSummaryCardComponent('Inversión Total', totalInversion, 'RD$', 'summary-inversion')
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

    // Chart Type Selector
    const chartTypeSelectorContainer = document.createElement('div');
    chartTypeSelectorContainer.className = 'chart-type-selector-container';
    const chartTypeLabel = document.createElement('p');
    chartTypeLabel.textContent = 'Seleccionar Tipo de Gráfico:';
    chartTypeLabel.className = 'chart-type-label';
    chartTypeSelectorContainer.appendChild(chartTypeLabel);

    const chartTypeButtonsGroup = document.createElement('div');
    chartTypeButtonsGroup.className = 'chart-type-buttons-group';

    (['line', 'bar', 'pie'] as FinancialPanelChartType[]).forEach(type => {
        const button = document.createElement('button');
        button.textContent = type.charAt(0).toUpperCase() + type.slice(1) + (type === 'pie' ? ' (Total)' : '');
        button.className = 'chart-type-button';
        if (financialPanelChartType === type) {
            button.classList.add('active');
        }
        button.onclick = () => {
            financialPanelChartType = type;
            renderApp();
        };
        chartTypeButtonsGroup.appendChild(button);
    });
    chartTypeSelectorContainer.appendChild(chartTypeButtonsGroup);
    chartSectionCard.appendChild(chartTypeSelectorContainer);


    const chartContainer = document.createElement('div');
    chartContainer.className = 'dashboard-chart-container';
    chartSectionCard.appendChild(chartContainer);

    parentElement.appendChild(chartSectionCard);

    const processedChartData = getProcessedChartData();

    if (financialPanelChartType === 'line') {
        renderTrendChartSVG(chartContainer, processedChartData);
    } else if (financialPanelChartType === 'bar') {
        renderBarChartSVG(chartContainer, processedChartData);
    } else if (financialPanelChartType === 'pie') {
        let totalPeriodIngresos = 0;
        let totalPeriodGastos = 0;
        let totalPeriodInversion = 0;
        processedChartData.forEach(dp => {
            totalPeriodIngresos += dp.ingresos;
            totalPeriodGastos += dp.gastos; // Already absolute from getProcessedChartData
            totalPeriodInversion += dp.inversion; // Already absolute
        });
        const pieChartDisplayData: PieChartSegment[] = [
            { name: 'Ingresos', value: totalPeriodIngresos, color: CHART_COLORS.ingresos },
            { name: 'Gastos', value: totalPeriodGastos, color: CHART_COLORS.gastos },
            { name: 'Inversión', value: totalPeriodInversion, color: CHART_COLORS.inversion }
        ].filter(segment => segment.value > 0);

        renderPieChartSVG(chartContainer, pieChartDisplayData);
    }
}

function _updateRecordIntegranteList(searchTerm: string) {
    const ul = document.getElementById(RECORD_INTEGRANTE_SELECT_LIST_ID) as HTMLUListElement;
    if (!ul) return;
    ul.innerHTML = '';

    const normalizedSearchTerm = normalizeStringForComparison(searchTerm);
    const filtered = searchTerm.trim() === ''
        ? [...integrantes].sort((a,b) => a.nombre.localeCompare(b.nombre))
        : integrantes.filter(inte => normalizeStringForComparison(inte.nombre).includes(normalizedSearchTerm))
                     .sort((a,b) => a.nombre.localeCompare(b.nombre));
    
    if (filtered.length === 0 && searchTerm.trim() !== '') {
        const noResultItem = document.createElement('li');
        noResultItem.textContent = 'Ningún integrante coincide';
        noResultItem.className = 'selectable-list-item disabled';
        ul.appendChild(noResultItem);
    } else {
        filtered.forEach(integrante => {
            const listItem = document.createElement('li');
            listItem.className = 'selectable-list-item';
            listItem.textContent = integrante.nombre;
            listItem.onclick = () => {
                newRecordIntegranteId = integrante.id;
                newRecordIntegranteSelectedName = integrante.nombre;
                const mainArea = document.getElementById('main-content-area');
                if (mainArea) mainContentScrollTop = mainArea.scrollTop;
                focusTargetId = RECORD_INTEGRANTE_FILTER_INPUT_ID;
                renderApp();
            };
            ul.appendChild(listItem);
        });
    }
}

function _updateRecordRazonList(searchTerm: string) {
    const ul = document.getElementById(RECORD_RAZON_SELECT_LIST_ID) as HTMLUListElement;
    if (!ul) return;
    ul.innerHTML = '';

    const normalizedSearchTerm = normalizeStringForComparison(searchTerm);
    const filtered = searchTerm.trim() === ''
        ? [...razones].sort((a,b) => a.descripcion.localeCompare(b.descripcion))
        : razones.filter(raz => normalizeStringForComparison(raz.descripcion).includes(normalizedSearchTerm))
                   .sort((a,b) => a.descripcion.localeCompare(b.descripcion));

    if (filtered.length === 0 && searchTerm.trim() !== '') {
        const noResultItem = document.createElement('li');
        noResultItem.textContent = 'Ninguna razón coincide';
        noResultItem.className = 'selectable-list-item disabled';
        ul.appendChild(noResultItem);
    } else {
        filtered.forEach(razon => {
            const listItem = document.createElement('li');
            listItem.className = 'selectable-list-item';
            listItem.textContent = razon.descripcion;
            listItem.onclick = () => {
                newRecordRazonId = razon.id;
                newRecordRazonSelectedDescripcion = razon.descripcion;
                const mainArea = document.getElementById('main-content-area');
                if (mainArea) mainContentScrollTop = mainArea.scrollTop;
                focusTargetId = RECORD_RAZON_FILTER_INPUT_ID;
                renderApp();
            };
            ul.appendChild(listItem);
        });
    }
}

function getFilteredAndSortedRecords() {
    let displayRecords = [...financialRecords];
    const normalizedFilterText = normalizeStringForComparison(recordFilterText);

    if (normalizedFilterText) {
        displayRecords = displayRecords.filter(record => {
            let fieldValue: string | undefined = ''; 
            const integrante = integrantes.find(i => i.id === record.integranteId);
            const razon = razones.find(r => r.id === record.razonId);

            switch (recordFilterField) {
                case 'fecha': fieldValue = record.fecha; break;
                case 'integrante': fieldValue = integrante ? integrante.nombre : ''; break;
                case 'movimiento': fieldValue = record.movimiento; break;
                case 'razon': fieldValue = razon ? razon.descripcion : ''; break;
                case 'descripcion': fieldValue = record.descripcion; break;
                default: return false; 
            }
            return normalizeStringForComparison(fieldValue).includes(normalizedFilterText);
        });
    }
    
    return displayRecords.sort((a,b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime() || b.id - a.id);
}

function populateRecordsTableBody(tbody: HTMLTableSectionElement) {
    tbody.innerHTML = '';
    const recordsToDisplay = getFilteredAndSortedRecords();

    recordsToDisplay.forEach(record => {
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
}


function renderRecordsScreen(parentElement: HTMLElement): void {
    const header = document.createElement('h1');
    header.className = 'header-title';
    header.innerHTML = 'Gestión de Registros';
    parentElement.appendChild(header);

    const csvActionsContainer = document.createElement('div');
    csvActionsContainer.className = 'import-export-actions';

    const mainImportButton = document.createElement('button');
    mainImportButton.textContent = 'Importar CSV (Registros)';
    mainImportButton.className = 'csv-action-button';
    mainImportButton.onclick = () => {
        showFinancialImportOptions = !showFinancialImportOptions;
        renderApp();
    };
    csvActionsContainer.appendChild(mainImportButton);

    const exportButton = document.createElement('button');
    exportButton.textContent = 'Exportar CSV (Registros)';
    exportButton.className = 'csv-action-button';
    exportButton.onclick = handleExportFinancialRecordsCSV;
    csvActionsContainer.appendChild(exportButton);
    parentElement.appendChild(csvActionsContainer);

    if (showFinancialImportOptions) {
        const importOptionsDiv = document.createElement('div');
        importOptionsDiv.className = 'financial-import-options-container';

        const replaceButton = document.createElement('button');
        replaceButton.textContent = 'Sustituir todos los registros existentes con los del archivo';
        replaceButton.className = 'financial-import-option-button';
        replaceButton.onclick = () => {
            financialImportMode = 'replace';
            showFinancialImportOptions = false;
            document.getElementById(CSV_FILE_INPUT_ID)?.click();
            renderApp(); // To hide options immediately
        };
        importOptionsDiv.appendChild(replaceButton);

        const appendButton = document.createElement('button');
        appendButton.textContent = 'Agregar los registros del archivo a los que ya existen';
        appendButton.className = 'financial-import-option-button';
        appendButton.onclick = () => {
            financialImportMode = 'append';
            showFinancialImportOptions = false;
            document.getElementById(CSV_FILE_INPUT_ID)?.click();
            renderApp(); // To hide options immediately
        };
        importOptionsDiv.appendChild(appendButton);
        parentElement.appendChild(importOptionsDiv);
    }

    const csvFileInput = document.createElement('input');
    csvFileInput.type = 'file';
    csvFileInput.id = CSV_FILE_INPUT_ID;
    csvFileInput.accept = '.csv';
    csvFileInput.style.display = 'none';
    csvFileInput.onchange = handleImportFinancialRecordsCSVFile;
    parentElement.appendChild(csvFileInput); // Needs to be in DOM for .click()

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
        _updateRecordIntegranteList(newRecordIntegranteSearchText);
    };
    integranteFilterGroup.appendChild(integranteFilterLabel);
    integranteFilterGroup.appendChild(integranteFilterInput);

    const integranteListWrapper = document.createElement('div');
    integranteListWrapper.className = 'selectable-list-wrapper';
    const integranteUl = document.createElement('ul');
    integranteUl.id = RECORD_INTEGRANTE_SELECT_LIST_ID;
    integranteUl.className = 'selectable-list';
    integranteListWrapper.appendChild(integranteUl);
    integranteFilterGroup.appendChild(integranteListWrapper);
    form.appendChild(integranteFilterGroup);
    _updateRecordIntegranteList(newRecordIntegranteSearchText); // Initial population


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
        _updateRecordRazonList(newRecordRazonSearchText);
    };
    razonFilterGroup.appendChild(razonFilterLabel);
    razonFilterGroup.appendChild(razonFilterInput);

    const razonListWrapper = document.createElement('div');
    razonListWrapper.className = 'selectable-list-wrapper';
    const razonUl = document.createElement('ul');
    razonUl.id = RECORD_RAZON_SELECT_LIST_ID;
    razonUl.className = 'selectable-list';
    razonListWrapper.appendChild(razonUl);
    razonFilterGroup.appendChild(razonListWrapper);
    form.appendChild(razonFilterGroup);
    _updateRecordRazonList(newRecordRazonSearchText); // Initial population


    const descripcionGroup = document.createElement('div');
    descripcionGroup.className = 'form-group';
    const descripcionLabel = document.createElement('label');
    descripcionLabel.setAttribute('for', 'record-descripcion');
    descripcionLabel.textContent = 'Descripción/Detalles (con sugerencias):';
    
    const uniqueDescriptions = Array.from(new Set(financialRecords.map(r => r.descripcion?.trim()).filter(Boolean)));
    
    const descripcionInput = document.createElement('input');
    descripcionInput.type = 'text';
    descripcionInput.id = 'record-descripcion';
    descripcionInput.className = 'form-input';
    descripcionInput.setAttribute('list', 'descripcion-suggestions');
    descripcionInput.placeholder = 'Escriba para ver sugerencias...';
    descripcionInput.value = newRecordDescripcion;
    descripcionInput.oninput = (e) => newRecordDescripcion = (e.target as HTMLInputElement).value;
    
    const datalist = document.createElement('datalist');
    datalist.id = 'descripcion-suggestions';
    uniqueDescriptions.forEach(desc => {
        const option = document.createElement('option');
        option.value = desc;
        datalist.appendChild(option);
    });

    descripcionGroup.appendChild(descripcionLabel);
    descripcionGroup.appendChild(descripcionInput);
    descripcionGroup.appendChild(datalist);
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

    // Records Filter Section
    const recordsFilterContainer = document.createElement('div');
    recordsFilterContainer.className = 'records-filter-container';

    const filterFieldGroup = document.createElement('div');
    filterFieldGroup.className = 'form-group';
    const filterFieldLabel = document.createElement('label');
    filterFieldLabel.setAttribute('for', RECORD_FILTER_FIELD_SELECT_ID);
    filterFieldLabel.textContent = 'Filtrar por:';
    const filterFieldSelect = document.createElement('select');
    filterFieldSelect.id = RECORD_FILTER_FIELD_SELECT_ID;
    filterFieldSelect.className = 'form-input';
    filterFieldSelect.onchange = (e) => {
        recordFilterField = (e.target as HTMLSelectElement).value as RecordFilterField;
        // Re-render is acceptable here as it's not a keystroke event
        renderApp();
    };

    const filterOptions: {value: RecordFilterField, text: string}[] = [
        { value: 'descripcion', text: 'Descripción' },
        { value: 'fecha', text: 'Fecha' },
        { value: 'integrante', text: 'Integrante' },
        { value: 'movimiento', text: 'Movimiento' },
        { value: 'razon', text: 'Razón' },
    ];

    filterOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        if (recordFilterField === opt.value) {
            option.selected = true; 
        }
        filterFieldSelect.appendChild(option);
    });
    filterFieldSelect.value = recordFilterField;


    filterFieldGroup.appendChild(filterFieldLabel);
    filterFieldGroup.appendChild(filterFieldSelect);
    recordsFilterContainer.appendChild(filterFieldGroup);

    const filterTextGroup = document.createElement('div');
    filterTextGroup.className = 'form-group';
    const filterTextLabel = document.createElement('label');
    filterTextLabel.setAttribute('for', RECORD_FILTER_TEXT_INPUT_ID);
    filterTextLabel.textContent = 'Texto a buscar:';
    const filterTextInput = document.createElement('input');
    filterTextInput.type = 'text';
    filterTextInput.id = RECORD_FILTER_TEXT_INPUT_ID;
    filterTextInput.className = 'form-input';
    filterTextInput.placeholder = 'Escriba para filtrar...';
    filterTextInput.value = recordFilterText;
    filterTextInput.autocomplete = 'off';
    filterTextInput.oninput = (e) => {
        recordFilterText = (e.target as HTMLInputElement).value;
        const tbody = document.querySelector('.records-table tbody');
        if (tbody) {
            populateRecordsTableBody(tbody as HTMLTableSectionElement);
        }
    };
    filterTextGroup.appendChild(filterTextLabel);
    filterTextGroup.appendChild(filterTextInput);
    recordsFilterContainer.appendChild(filterTextGroup);

    parentElement.appendChild(recordsFilterContainer);


    const tableContainer = document.createElement('div');
    tableContainer.className = 'records-table-container';
    const table = document.createElement('table');
    table.className = 'records-table';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['Fecha', 'Integrante', 'Movimiento', 'Razon', 'Descripcion', 'Monto'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    populateRecordsTableBody(tbody); // Use helper for initial population
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
        monto: montoValue // Stored as a positive number
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
    const blob = new Blob([`\uFEFF${csvString}`], { type: 'text/csv;charset=utf-8;' }); // Added BOM for Excel
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

    const headers = ['FECHA', 'INTEGRANTE', 'MOVIMIENTO', 'RAZON', 'DESCRIPCION DETALLADA', 'MONTO'];
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

    // Try YYYY-MM-DD (standard)
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

    // Try DD/MM/YYYY
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

    // Try YYYY-M-D or YYYY-MM-D or YYYY-M-DD (less strict YYYY-MM-DD)
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
        const headersFromCsv = parseCsvLine(headerLine).map(h => normalizeStringForComparison(h));
        const expectedHeadersNormalized = ['FECHA', 'INTEGRANTE', 'MOVIMIENTO', 'RAZON', 'DESCRIPCION DETALLADA', 'MONTO'].map(normalizeStringForComparison);

        const headerMap: { [key: string]: number } = {};
        headersFromCsv.forEach((h, i) => headerMap[h] = i);

        const missingHeaders = expectedHeadersNormalized.filter(eh => headerMap[eh] === undefined);
        if (missingHeaders.length > 0) {
             alert(`Encabezados faltantes o incorrectos en el CSV de registros. Esperados: ${expectedHeadersNormalized.join(', ')}. Encontrados: ${headersFromCsv.join(', ')}.\nFaltantes: ${missingHeaders.join(', ')}`);
            fileInput.value = '';
            return;
        }


        if (financialImportMode === 'replace') {
            financialRecords = [];
            nextRecordId = 1; // Reset ID for new set of records
        }

        let importedCount = 0;
        let skippedCount = 0;
        const newRecordsBatch: FinancialRecord[] = [];
        const tempNextIdForImport = financialRecords.length > 0 ? Math.max(0, ...financialRecords.map(r => r.id)) + 1 : 1;


        for (let i = 1; i < lines.length; i++) {
            const values = parseCsvLine(lines[i]);
            if (values.length < expectedHeadersNormalized.length) {
                console.warn(`Fila ${i+1} (registros) omitida: número incorrecto de columnas. Esperadas ${expectedHeadersNormalized.length}, obtenidas ${values.length}. Contenido: ${lines[i]}`);
                skippedCount++;
                continue;
            }


            const rawFecha = values[headerMap['FECHA']].trim();
            const csvIntegranteNombreRaw = values[headerMap['INTEGRANTE']].trim();
            const csvIntegranteNombreUpper = csvIntegranteNombreRaw.toUpperCase();
            const movimientoTipo = values[headerMap['MOVIMIENTO']].trim().toUpperCase() as 'INGRESOS' | 'GASTOS' | 'INVERSION';
            const csvRazonDescripcionRaw = values[headerMap['RAZON']].trim();
            const csvRazonDescripcionUpper = csvRazonDescripcionRaw.toUpperCase();
            const descripcionDetallada = values[headerMap['DESCRIPCION DETALLADA']].trim();
            const montoStr = values[headerMap['MONTO']].trim().replace(/,/g, ''); // Remove commas from amount for parseFloat

            const fecha = parseFlexibleDate(rawFecha);
            if (!fecha) {
                console.warn(`Fila ${i+1} (registros) omitida: Fecha inválida '${rawFecha}'. Formatos aceptados: YYYY-MM-DD o DD/MM/YYYY.`);
                skippedCount++;
                continue;
            }

            let integranteId: number | null = null;
            let finalIntegrante: {id: number, nombre: string} | undefined = undefined;

            const normalizedCsvIntegrante = normalizeStringForComparison(csvIntegranteNombreUpper);
            finalIntegrante = integrantes.find(inte => normalizeStringForComparison(inte.nombre) === normalizedCsvIntegrante);

            if (!finalIntegrante) {
                // Auto-create new integrante if not found after normalization
                const newIntegrante = { id: nextIntegranteId++, nombre: csvIntegranteNombreUpper };
                integrantes.push(newIntegrante);
                // saveIntegrantesToLocalStorage(); // Save after batch processing
                finalIntegrante = newIntegrante;
                console.log(`Fila ${i+1} (registros): Integrante '${csvIntegranteNombreRaw}' ('${csvIntegranteNombreUpper}') no encontrado. Auto-creado con ID ${finalIntegrante.id}.`);
            }
            integranteId = finalIntegrante.id;


            if (!['INGRESOS', 'GASTOS', 'INVERSION'].includes(movimientoTipo)) {
                console.warn(`Fila ${i+1} (registros) omitida: Tipo de Movimiento inválido '${movimientoTipo}'.`);
                skippedCount++;
                continue;
            }

            let razonId: number | null = null;
            let finalRazon: Razon | undefined = undefined;

            const normalizedCsvRazon = normalizeStringForComparison(csvRazonDescripcionUpper);
            finalRazon = razones.find(raz => normalizeStringForComparison(raz.descripcion) === normalizedCsvRazon);

            if (!finalRazon) {
                 // Auto-create new razon if not found after normalization
                const newRazon: Razon = { id: nextReasonId++, descripcion: csvRazonDescripcionUpper, isQuickReason: false };
                razones.push(newRazon);
                // saveRazonesToLocalStorage(); // Save after batch processing
                finalRazon = newRazon;
                console.log(`Fila ${i+1} (registros): Razon '${csvRazonDescripcionRaw}' ('${csvRazonDescripcionUpper}') no encontrada. Auto-creada con ID ${finalRazon.id}.`);
            }
            razonId = finalRazon.id;


            const monto = parseFloat(montoStr);
            if (isNaN(monto)) {
                console.warn(`Fila ${i+1} (registros) omitida: Monto inválido '${montoStr}'. Debe ser un número.`);
                skippedCount++;
                continue;
            }

            newRecordsBatch.push({
                id: 0, // Placeholder, will be assigned before final push
                fecha: fecha,
                integranteId: integranteId,
                movimiento: movimientoTipo,
                razonId: razonId,
                descripcion: descripcionDetallada,
                monto: monto
            });
        }

        if (newRecordsBatch.length > 0) {
             let currentBatchNextId = tempNextIdForImport;
            newRecordsBatch.forEach(record => {
                record.id = currentBatchNextId++;
                financialRecords.push(record);
                importedCount++;
            });
            nextRecordId = currentBatchNextId; // Update global nextRecordId after batch
            saveFinancialRecords();
            saveIntegrantesToLocalStorage(); // Save any auto-created integrantes
            saveRazonesToLocalStorage(); // Save any auto-created razones
        }

        alert(`${importedCount} registro(s) financiero(s) importado(s) con éxito.\n${skippedCount} fila(s) omitida(s). Revise la consola para detalles.`);
        fileInput.value = ''; // Clear file input
        // financialImportMode = 'append'; // Reset to default mode for next time (already default)
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
    const headers = ['ID', 'DESCRIPCION', 'ESRAPIDA'];
    const csvRows = [headers.join(',')];
    razones.forEach(razon => {
        const row = [
            escapeCsvValue(razon.id),
            escapeCsvValue(razon.descripcion),
            escapeCsvValue(razon.isQuickReason)
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
        const headersFromCsv = parseCsvLine(headerLine).map(h => normalizeStringForComparison(h));
        const idColIdx = headersFromCsv.indexOf('ID');
        const descColIdx = headersFromCsv.indexOf('DESCRIPCION');
        const isQuickColIdx = headersFromCsv.indexOf('ESRAPIDA');


        if (descColIdx === -1) {
            alert(`Encabezado requerido 'descripcion' no encontrado en el CSV de razones. Encontrados: ${headersFromCsv.join(', ')}`);
            fileInput.value = ''; return;
        }

        if (razonImportMode === 'replace') {
            razones = [];
            nextReasonId = 1;
        }

        let importedCount = 0, updatedCount = 0, skippedCount = 0;
        let tempNextReasonIdForImport = razones.length > 0 ? Math.max(0, ...razones.map(r => r.id)) + 1 : 1;


        for (let i = 1; i < lines.length; i++) {
            const values = parseCsvLine(lines[i]);
             if (values.length <= descColIdx && (idColIdx === -1 || values.length <= idColIdx) ) {
                console.warn(`Fila ${i+1} (razones) omitida: Muy pocas columnas. Contenido: ${lines[i]}`);
                skippedCount++; continue;
            }
            const rawDesc = values[descColIdx]?.trim().toUpperCase();
            const rawIsQuick = (isQuickColIdx !== -1 && values.length > isQuickColIdx) ? values[isQuickColIdx]?.trim().toLowerCase() : 'false';
            const isQuickReason = rawIsQuick === 'true' || rawIsQuick === 'verdadero';


            if (!rawDesc) {
                console.warn(`Fila ${i+1} (razones) omitida: Descripción está vacía.`);
                skippedCount++; continue;
            }

            const csvIdStr = (idColIdx !== -1 && values.length > idColIdx) ? values[idColIdx]?.trim() : null;
            let csvId: number | null = null;
            if (csvIdStr) {
                const parsed = parseInt(csvIdStr, 10);
                if (!isNaN(parsed) && parsed > 0) {
                    csvId = parsed;
                } else {
                     console.warn(`Fila ${i+1} (razones): ID '${csvIdStr}' inválido. Se tratará como nueva si la descripción es única.`);
                }
            }

            const normalizedRawDesc = normalizeStringForComparison(rawDesc);
            const existingRazonById = csvId !== null ? razones.find(r => r.id === csvId) : null;
            // When replacing, existingRazonByDesc will only find matches within the current CSV batch if IDs are not unique
            const existingRazonByDesc = razones.find(r => normalizeStringForComparison(r.descripcion) === normalizedRawDesc && (existingRazonById ? r.id !== existingRazonById.id : true));


            if (existingRazonById) {
                let changed = false;
                if (existingRazonById.descripcion !== rawDesc) {
                    if (razones.some(r => r.id !== csvId && normalizeStringForComparison(r.descripcion) === normalizedRawDesc)) {
                        console.warn(`Fila ${i+1} (razones) omitida: Nueva descripción '${rawDesc}' para ID ${csvId} ya existe con otro ID.`);
                        skippedCount++;
                        continue; // Skip this iteration
                    }
                    existingRazonById.descripcion = rawDesc;
                    changed = true;
                }
                if (existingRazonById.isQuickReason !== isQuickReason) {
                    existingRazonById.isQuickReason = isQuickReason;
                    changed = true;
                }
                if (changed) updatedCount++;
            } else if (existingRazonByDesc) {
                console.warn(`Fila ${i+1} (razones) omitida: Descripción '${rawDesc}' ya existe (ID en CSV: ${csvIdStr || 'N/A'}, ID de existente: ${existingRazonByDesc.id}). No se puede asignar nuevo ID si descripción ya existe.`);
                skippedCount++;
            } else {
                 let newIdToUse = csvId;
                 if (newIdToUse === null || razones.some(r => r.id === newIdToUse)) { // If no CSV ID or CSV ID is already taken
                     newIdToUse = tempNextReasonIdForImport++;
                     while(razones.some(r => r.id === newIdToUse)) { // Ensure really unique ID
                        newIdToUse = tempNextReasonIdForImport++;
                     }
                 }

                razones.push({ id: newIdToUse, descripcion: rawDesc, isQuickReason: isQuickReason });
                tempNextReasonIdForImport = Math.max(tempNextReasonIdForImport, newIdToUse + 1);
                importedCount++;
            }
        }
        if (importedCount > 0 || updatedCount > 0) {
             saveRazonesToLocalStorage();
        } else if (razonImportMode === 'replace' && importedCount === 0 && updatedCount === 0) {
            // If replace mode and nothing was imported/updated, ensure localStorage is also cleared
            saveRazonesToLocalStorage();
        }
        alert(`Razones importadas: ${importedCount}, actualizadas: ${updatedCount}, omitidas: ${skippedCount}. Revise consola para detalles.`);
        fileInput.value = '';
        renderApp();
    };
    reader.onerror = () => { alert('Error al leer el archivo CSV de razones.'); fileInput.value = ''; };
    reader.readAsText(file);
}

function _updateRazonesManagementList(searchTerm: string, sortOrder: typeof razonesSortOrder) {
    const ul = document.getElementById(RAZONES_LIST_CONTAINER_ID) as HTMLUListElement;
    if (!ul) return;
    ul.innerHTML = '';

    let filteredRazones = razones.filter(razon =>
        normalizeStringForComparison(razon.descripcion).includes(normalizeStringForComparison(searchTerm))
    );

    const sortedRazones = [...filteredRazones];
    switch (sortOrder) {
        case 'id_asc': sortedRazones.sort((a, b) => a.id - b.id); break;
        case 'id_desc': sortedRazones.sort((a, b) => b.id - b.id); break;
        case 'alpha_asc': sortedRazones.sort((a, b) => a.descripcion.localeCompare(b.descripcion)); break;
        case 'alpha_desc': sortedRazones.sort((a, b) => b.descripcion.localeCompare(a.descripcion)); break;
    }

    sortedRazones.forEach(razon => {
        const listItem = document.createElement('li');
        listItem.className = 'razon-item';
        if (editingReasonId === razon.id) {
            const editInput = document.createElement('input');
            editInput.setAttribute('type', 'text');
            editInput.className = 'razon-input';
            editInput.value = editReasonInputText; // This should be from a state variable that's updated on input
            const EDIT_INPUT_ID = `edit-razon-${razon.id}`; // This ID needs to be unique if multiple edits are possible (not current design)
            editInput.id = EDIT_INPUT_ID;
            editInput.oninput = (e) => editReasonInputText = (e.target as HTMLInputElement).value; // Update state on input

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Guardar';
            saveButton.className = 'nav-button action-button-inline success-button';
            saveButton.onclick = () => { // This logic remains the same, it calls renderApp
                const trimmedEditText = editReasonInputText.trim().toUpperCase();
                if (trimmedEditText) {
                    if (razones.some(r => normalizeStringForComparison(r.descripcion) === normalizeStringForComparison(trimmedEditText) && r.id !== razon.id)) {
                        alert('Ya existe otra razón con esta descripción.'); return;
                    }
                    const index = razones.findIndex(r => r.id === razon.id);
                    if (index !== -1) {
                        razones[index].descripcion = trimmedEditText;
                        saveRazonesToLocalStorage();
                    }
                    editingReasonId = null;
                    focusTargetId = null; 
                    renderApp();
                } else {
                     alert('La descripción no puede estar vacía.');
                }
            };
            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'Cancelar';
            cancelButton.className = 'nav-button action-button-inline danger-button';
            cancelButton.onclick = () => { // This logic also remains the same
                editingReasonId = null;
                focusTargetId = null;
                renderApp();
            };
            listItem.appendChild(editInput); listItem.appendChild(saveButton); listItem.appendChild(cancelButton);
            // We need to ensure focus is managed if an edit input is created dynamically
            // but for now, the primary goal is to fix the search input.
            // If editInput is focused, typing in it won't cause renderApp().
        } else {
            const textSpan = document.createElement('span');
            textSpan.className = 'razon-text';
            textSpan.textContent = `${razon.id}. ${razon.descripcion}`;

            const actionsContainer = document.createElement('div');
            actionsContainer.className = 'list-item-actions';

            const toggleQuickIconButton = document.createElement('button');
            toggleQuickIconButton.className = `icon-button quick-toggle-icon-button${razon.isQuickReason ? ' active' : ''}`;
            toggleQuickIconButton.title = razon.isQuickReason ? 'Desactivar de Rápido' : 'Activar para Rápido';
            toggleQuickIconButton.innerHTML = ICONS.quick;
            toggleQuickIconButton.setAttribute('aria-label', toggleQuickIconButton.title);
            toggleQuickIconButton.onclick = () => { // This calls renderApp()
                const mainArea = document.getElementById('main-content-area');
                if (mainArea) mainContentScrollTop = mainArea.scrollTop;
                focusTargetId = null;
                const targetRazon = razones.find(r => r.id === razon.id);
                if (targetRazon) {
                    targetRazon.isQuickReason = !targetRazon.isQuickReason;
                    saveRazonesToLocalStorage();
                    renderApp();
                }
            };

            const editButton = document.createElement('button');
            editButton.innerHTML = ICONS.edit;
            editButton.className = 'icon-button edit-icon-button';
            editButton.setAttribute('aria-label', 'Editar Razón');
            editButton.onclick = () => { // This calls renderApp()
                editingReasonId = razon.id;
                editReasonInputText = razon.descripcion;
                renderApp(); // This will re-render the list item in edit mode
            };
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = ICONS.delete;
            deleteButton.className = 'icon-button delete-icon-button';
            deleteButton.setAttribute('aria-label', 'Eliminar Razón');
            deleteButton.onclick = () => { // This calls renderApp()
                 if (financialRecords.some(fr => fr.razonId === razon.id)) {
                    alert(`No se puede eliminar la razón "${razon.descripcion}" porque está siendo utilizada en registros financieros.`); return;
                }
                if (window.confirm(`¿Está seguro de que desea eliminar la razón "${razon.descripcion}" (ID: ${razon.id})?`)) {
                    razones = razones.filter(r => r.id !== razon.id);
                    saveRazonesToLocalStorage();
                    if (editingReasonId === razon.id) editingReasonId = null;
                    renderApp();
                }
            };
            actionsContainer.appendChild(toggleQuickIconButton);
            actionsContainer.appendChild(editButton);
            actionsContainer.appendChild(deleteButton);
            listItem.appendChild(textSpan);
            listItem.appendChild(actionsContainer);
        }
        ul.appendChild(listItem);
    });
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
    importButtonCsv.onclick = () => {
        showRazonImportOptions = !showRazonImportOptions;
        renderApp();
    };
    csvActionsContainer.appendChild(importButtonCsv);

    const exportButtonCsv = document.createElement('button');
    exportButtonCsv.textContent = 'Exportar CSV (Razones)';
    exportButtonCsv.className = 'csv-action-button';
    exportButtonCsv.onclick = handleExportRazonesCSV;
    csvActionsContainer.appendChild(exportButtonCsv);
    parentElement.appendChild(csvActionsContainer);

    if (showRazonImportOptions) {
        const importOptionsDiv = document.createElement('div');
        importOptionsDiv.className = 'financial-import-options-container'; // Reuse class

        const replaceButton = document.createElement('button');
        replaceButton.textContent = 'Sustituir todas las razones existentes con las del archivo';
        replaceButton.className = 'financial-import-option-button';
        replaceButton.onclick = () => {
            razonImportMode = 'replace';
            showRazonImportOptions = false;
            document.getElementById(RAZON_CSV_FILE_INPUT_ID)?.click();
            renderApp();
        };
        importOptionsDiv.appendChild(replaceButton);

        const appendButton = document.createElement('button');
        appendButton.textContent = 'Agregar las razones del archivo a las que ya existen';
        appendButton.className = 'financial-import-option-button';
        appendButton.onclick = () => {
            razonImportMode = 'append';
            showRazonImportOptions = false;
            document.getElementById(RAZON_CSV_FILE_INPUT_ID)?.click();
            renderApp();
        };
        importOptionsDiv.appendChild(appendButton);
        parentElement.appendChild(importOptionsDiv);
    }

    const csvFileInput = document.createElement('input');
    csvFileInput.type = 'file';
    csvFileInput.id = RAZON_CSV_FILE_INPUT_ID;
    csvFileInput.accept = '.csv';
    csvFileInput.style.display = 'none';
    csvFileInput.onchange = handleImportRazonesCSVFile;
    parentElement.appendChild(csvFileInput);


    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', 'Buscar razón...');
    searchInput.className = 'razon-input search-razon-input';
    searchInput.id = RAZON_SEARCH_INPUT_ID;
    searchInput.value = razonesSearchTerm;
    searchInput.autocomplete = 'off';
    searchInput.oninput = (e) => {
        razonesSearchTerm = (e.target as HTMLInputElement).value;
        _updateRazonesManagementList(razonesSearchTerm, razonesSortOrder);
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
            if (razones.some(r => normalizeStringForComparison(r.descripcion) === normalizeStringForComparison(trimmedText))) {
                alert('Esta razón ya existe.');
                return;
            }
            razones.push({ id: nextReasonId++, descripcion: trimmedText, isQuickReason: false });
            saveRazonesToLocalStorage(); // This calls updateQuickRazonesAvailable and setDefaultQuickRecordRazonId
            newReasonInputText = '';
            editingReasonId = null; 
            // razonesSearchTerm = ''; // Clearing search term also
            // _updateRazonesManagementList(razonesSearchTerm, razonesSortOrder); // Update list after adding
            // No, renderApp is better here to reset input value and update list via full render
            const mainArea = document.getElementById('main-content-area');
            if(mainArea) mainContentScrollTop = mainArea.scrollTop;
            focusTargetId = RAZON_SEARCH_INPUT_ID; // Focus back on search or the add input
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
        _updateRazonesManagementList(razonesSearchTerm, razonesSortOrder); // Update list on sort change
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


    const listContainerUL = document.createElement('ul');
    listContainerUL.id = RAZONES_LIST_CONTAINER_ID;
    listContainerUL.className = 'razones-list';
    parentElement.appendChild(listContainerUL);
    
    _updateRazonesManagementList(razonesSearchTerm, razonesSortOrder); // Initial population
}

function handleExportIntegrantesCSV() {
    if (integrantes.length === 0) {
        alert('No hay integrantes para exportar.');
        return;
    }
    const headers = ['ID', 'NOMBRE'];
    const csvRows = [headers.join(',')];
    integrantes.forEach(integrante => {
        const row = [
            escapeCsvValue(integrante.id),
            escapeCsvValue(integrante.nombre) // Export uppercase name
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
        const headersFromCsv = parseCsvLine(headerLine).map(h => normalizeStringForComparison(h));
        const idColIdx = headersFromCsv.indexOf('ID');
        const nameColIdx = headersFromCsv.indexOf('NOMBRE');

        if (nameColIdx === -1) {
            alert(`Encabezado requerido 'nombre' no encontrado en el CSV de integrantes. Encontrados: ${headersFromCsv.join(', ')}`);
            fileInput.value = ''; return;
        }

        if (integranteImportMode === 'replace') {
            integrantes = [];
            nextIntegranteId = 1;
        }

        let importedCount = 0, updatedCount = 0, skippedCount = 0;
        let tempNextIntegranteIdForImport = integrantes.length > 0 ? Math.max(0, ...integrantes.map(i => i.id)) + 1 : 1;

        const protectedIdsToPreserveOrUpdate = [
            { id: 1, defaultName: "LOS FORASTEROS" },
            { id: 2, defaultName: "INVITADOS" }
        ];

        if (integranteImportMode === 'replace') {
            // Ensure protected IDs are handled if not in CSV during replace
            protectedIdsToPreserveOrUpdate.forEach(p => {
                if (!integrantes.find(inte => inte.id === p.id)) {
                     // Check if CSV will add it later, if not, add default
                     const csvLineForProtected = lines.slice(1).find(line => {
                         const values = parseCsvLine(line);
                         const csvIdStr = (idColIdx !== -1 && values.length > idColIdx) ? values[idColIdx]?.trim() : null;
                         if (csvIdStr) {
                            const parsed = parseInt(csvIdStr, 10);
                            return !isNaN(parsed) && parsed === p.id;
                         }
                         return false;
                     });
                     if(!csvLineForProtected) {
                        integrantes.push({id: p.id, nombre: p.defaultName});
                     }
                }
            });
            tempNextIntegranteIdForImport = Math.max(tempNextIntegranteIdForImport, ...protectedIdsToPreserveOrUpdate.map(p=>p.id), 0) + 1;
        }


        for (let i = 1; i < lines.length; i++) {
            const values = parseCsvLine(lines[i]);
            if (values.length <= nameColIdx && (idColIdx === -1 || values.length <= idColIdx) ) {
                console.warn(`Fila ${i+1} (integrantes) omitida: Muy pocas columnas. Contenido: ${lines[i]}`);
                skippedCount++; continue;
            }
            const rawName = values[nameColIdx]?.trim().toUpperCase();

            if (!rawName) {
                console.warn(`Fila ${i+1} (integrantes) omitida: Nombre está vacío.`);
                skippedCount++; continue;
            }

            const csvIdStr = (idColIdx !== -1 && values.length > idColIdx) ? values[idColIdx]?.trim() : null;
            let csvId: number | null = null;
            if (csvIdStr) {
                const parsed = parseInt(csvIdStr, 10);
                if (!isNaN(parsed) && parsed > 0) {
                     csvId = parsed;
                } else {
                     console.warn(`Fila ${i+1} (integrantes): ID '${csvIdStr}' inválido. Se tratará como nuevo si el nombre es único.`);
                }
            }

            const normalizedRawName = normalizeStringForComparison(rawName);
            const existingIntegranteById = csvId !== null ? integrantes.find(inte => inte.id === csvId) : null;
            const existingIntegranteByName = integrantes.find(inte => normalizeStringForComparison(inte.nombre) === normalizedRawName && (existingIntegranteById ? inte.id !== existingIntegranteById.id : true));


            if (existingIntegranteById) {
                if (existingIntegranteById.nombre !== rawName) {
                    if (integrantes.some(inte => inte.id !== csvId && normalizeStringForComparison(inte.nombre) === normalizedRawName)) {
                        console.warn(`Fila ${i+1} (integrantes) omitida: Nuevo nombre '${rawName}' para ID ${csvId} ya existe con otro ID.`);
                        skippedCount++;
                    } else {
                        if ((existingIntegranteById.id === 1 || existingIntegranteById.id === 2) && rawName === '') {
                             console.warn(`Fila ${i+1} (integrantes): No se puede asignar un nombre vacío al integrante protegido ID ${existingIntegranteById.id}. Se mantiene nombre actual.`);
                             skippedCount++;
                        } else {
                            existingIntegranteById.nombre = rawName;
                            updatedCount++;
                        }
                    }
                }
            } else if (existingIntegranteByName) {
                console.warn(`Fila ${i+1} (integrantes) omitida: Nombre '${rawName}' ya existe (ID en CSV: ${csvIdStr || 'N/A'}, ID de existente: ${existingIntegranteByName.id}). No se puede asignar nuevo ID si nombre ya existe.`);
                skippedCount++;
            } else {
                let newIdToUse = csvId;
                 if (newIdToUse === null || integrantes.some(inte => inte.id === newIdToUse)) {
                     newIdToUse = tempNextIntegranteIdForImport++;
                     while(integrantes.some(inte => inte.id === newIdToUse)) {
                        newIdToUse = tempNextIntegranteIdForImport++;
                     }
                 }
                if ((newIdToUse === 1 || newIdToUse === 2) && rawName === '') {
                     console.warn(`Fila ${i+1} (integrantes): No se puede crear integrante protegido ID ${newIdToUse} con nombre vacío. Omitido.`);
                     skippedCount++;
                } else {
                    integrantes.push({ id: newIdToUse, nombre: rawName });
                    tempNextIntegranteIdForImport = Math.max(tempNextIntegranteIdForImport, newIdToUse + 1);
                    importedCount++;
                }
            }
        }

        if (integranteImportMode === 'replace') {
             protectedIdsToPreserveOrUpdate.forEach(p => {
                const existing = integrantes.find(inte => inte.id === p.id);
                if (!existing) {
                    integrantes.push({id: p.id, nombre: p.defaultName});
                    importedCount++;
                } else if (existing.nombre === '') { // If CSV tried to make it blank
                    existing.nombre = p.defaultName; // Restore default name
                    updatedCount++;
                }
            });
        }


        if (importedCount > 0 || updatedCount > 0) {
            saveIntegrantesToLocalStorage();
        } else if (integranteImportMode === 'replace' && importedCount === 0 && updatedCount === 0) {
             saveIntegrantesToLocalStorage();
        }

        alert(`Integrantes importados: ${importedCount}, actualizados: ${updatedCount}, omitidos: ${skippedCount}. Revise consola para detalles.`);
        fileInput.value = '';
        renderApp();
    };
    reader.onerror = () => { alert('Error al leer el archivo CSV de integrantes.'); fileInput.value = ''; };
    reader.readAsText(file);
}

function _updateIntegrantesManagementList(searchTerm: string, sortOrder: typeof integrantesSortOrder) {
    const ul = document.getElementById(INTEGRANTES_LIST_CONTAINER_ID) as HTMLUListElement;
    if (!ul) return;
    ul.innerHTML = '';

    let filteredIntegrantes = integrantes.filter(integrante =>
        normalizeStringForComparison(integrante.nombre).includes(normalizeStringForComparison(searchTerm))
    );

    const sortedIntegrantes = [...filteredIntegrantes];
    switch (sortOrder) {
        case 'id_asc': sortedIntegrantes.sort((a, b) => a.id - b.id); break;
        case 'id_desc': sortedIntegrantes.sort((a, b) => b.id - b.id); break;
        case 'alpha_asc': sortedIntegrantes.sort((a, b) => a.nombre.localeCompare(b.nombre)); break;
        case 'alpha_desc': sortedIntegrantes.sort((a, b) => b.nombre.localeCompare(a.nombre)); break;
    }

    sortedIntegrantes.forEach(integrante => {
        const listItem = document.createElement('li');
        listItem.className = 'razon-item'; // Re-use item style
        if (editingIntegranteId === integrante.id) {
            const editInput = document.createElement('input');
            editInput.setAttribute('type', 'text');
            editInput.className = 'razon-input'; // Re-use class
            editInput.value = editIntegranteInputText; // Should be state-managed
            const EDIT_INPUT_ID = `edit-integrante-${integrante.id}`;
            editInput.id = EDIT_INPUT_ID;
            editInput.oninput = (e) => editIntegranteInputText = (e.target as HTMLInputElement).value;


            const saveButton = document.createElement('button');
            saveButton.textContent = 'Guardar';
            saveButton.className = 'nav-button action-button-inline success-button';
            saveButton.onclick = () => { // Calls renderApp
                const trimmedEditText = editIntegranteInputText.trim().toUpperCase();
                 if ((integrante.id === 1 || integrante.id === 2) && trimmedEditText === "") {
                    alert(`El integrante "${integrante.nombre}" es un sistema y no puede tener un nombre vacío.`); return;
                }
                if (trimmedEditText) {
                    if (integrantes.some(i => normalizeStringForComparison(i.nombre) === normalizeStringForComparison(trimmedEditText) && i.id !== integrante.id)) {
                        alert('Ya existe otro integrante con este nombre.'); return;
                    }
                    const index = integrantes.findIndex(i => i.id === integrante.id);
                    if (index !== -1) {
                        integrantes[index].nombre = trimmedEditText;
                        saveIntegrantesToLocalStorage();
                    }
                    editingIntegranteId = null;
                    focusTargetId = null;
                    renderApp();
                } else {
                     alert('El nombre no puede estar vacío.');
                }
            };
            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'Cancelar';
            cancelButton.className = 'nav-button action-button-inline danger-button';
            cancelButton.onclick = () => { // Calls renderApp
                editingIntegranteId = null;
                focusTargetId = null;
                renderApp();
            };
            listItem.appendChild(editInput); listItem.appendChild(saveButton); listItem.appendChild(cancelButton);
        } else {
            const textSpan = document.createElement('span');
            textSpan.className = 'razon-text'; // Re-use class
            textSpan.textContent = `${integrante.id}. ${integrante.nombre}`;

            const actionsContainer = document.createElement('div');
            actionsContainer.className = 'list-item-actions'; // Re-use class

            const editButton = document.createElement('button');
            editButton.innerHTML = ICONS.edit;
            editButton.className = 'icon-button edit-icon-button'; // Re-use classes
            editButton.setAttribute('aria-label', 'Editar Integrante');
            editButton.onclick = () => { // Calls renderApp
                editingIntegranteId = integrante.id;
                editIntegranteInputText = integrante.nombre;
                renderApp();
            };
            actionsContainer.appendChild(editButton);

            if (integrante.id !== 1 && integrante.id !== 2) {
                const deleteButton = document.createElement('button');
                deleteButton.innerHTML = ICONS.delete;
                deleteButton.className = 'icon-button delete-icon-button'; // Re-use classes
                deleteButton.setAttribute('aria-label', 'Eliminar Integrante');
                deleteButton.onclick = () => { // Calls renderApp
                    if (financialRecords.some(fr => fr.integranteId === integrante.id)) {
                        alert(`No se puede eliminar al integrante "${integrante.nombre}" porque está siendo utilizado en registros financieros.`); return;
                    }
                    if (window.confirm(`¿Está seguro de que desea eliminar al integrante "${integrante.nombre}" (ID: ${integrante.id})?`)) {
                        integrantes = integrantes.filter(i => i.id !== integrante.id);
                        saveIntegrantesToLocalStorage();
                        if (editingIntegranteId === integrante.id) editingIntegranteId = null;
                        renderApp();
                    }
                };
                actionsContainer.appendChild(deleteButton);
            }
            listItem.appendChild(textSpan);
            listItem.appendChild(actionsContainer);
        }
        ul.appendChild(listItem);
    });
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
    importButtonCsv.onclick = () => {
        showIntegranteImportOptions = !showIntegranteImportOptions;
        renderApp();
    };
    csvActionsContainer.appendChild(importButtonCsv);

    const exportButtonCsv = document.createElement('button');
    exportButtonCsv.textContent = 'Exportar CSV (Integrantes)';
    exportButtonCsv.className = 'csv-action-button';
    exportButtonCsv.onclick = handleExportIntegrantesCSV;
    csvActionsContainer.appendChild(exportButtonCsv);
    parentElement.appendChild(csvActionsContainer);


    if (showIntegranteImportOptions) {
        const importOptionsDiv = document.createElement('div');
        importOptionsDiv.className = 'financial-import-options-container'; // Reuse class

        const replaceButton = document.createElement('button');
        replaceButton.textContent = 'Sustituir todos los integrantes con los del archivo';
        replaceButton.className = 'financial-import-option-button';
        replaceButton.onclick = () => {
            integranteImportMode = 'replace';
            showIntegranteImportOptions = false;
            document.getElementById(INTEGRANTE_CSV_FILE_INPUT_ID)?.click();
            renderApp();
        };
        importOptionsDiv.appendChild(replaceButton);

        const appendButton = document.createElement('button');
        appendButton.textContent = 'Agregar los integrantes del archivo a los existentes';
        appendButton.className = 'financial-import-option-button';
        appendButton.onclick = () => {
            integranteImportMode = 'append';
            showIntegranteImportOptions = false;
            document.getElementById(INTEGRANTE_CSV_FILE_INPUT_ID)?.click();
            renderApp();
        };
        importOptionsDiv.appendChild(appendButton);
        parentElement.appendChild(importOptionsDiv);
    }


    const csvFileInput = document.createElement('input');
    csvFileInput.type = 'file';
    csvFileInput.id = INTEGRANTE_CSV_FILE_INPUT_ID;
    csvFileInput.accept = '.csv';
    csvFileInput.style.display = 'none';
    csvFileInput.onchange = handleImportIntegrantesCSVFile;
    parentElement.appendChild(csvFileInput);


    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', 'Buscar integrante...');
    searchInput.className = 'razon-input search-razon-input'; // Re-use razon-input class for styling consistency
    searchInput.id = INTEGRANTE_SEARCH_INPUT_ID;
    searchInput.value = integrantesSearchTerm;
    searchInput.autocomplete = 'off';
    searchInput.oninput = (e) => {
        integrantesSearchTerm = (e.target as HTMLInputElement).value;
        _updateIntegrantesManagementList(integrantesSearchTerm, integrantesSortOrder);
    };
    searchContainer.appendChild(searchInput);
    parentElement.appendChild(searchContainer);

    const addForm = document.createElement('div');
    addForm.className = 'razon-form add-form'; // Re-use razon-form for styling
    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('placeholder', 'Nombre del nuevo integrante');
    newInput.className = 'razon-input'; // Re-use razon-input
    newInput.value = newIntegranteInputText;
    newInput.oninput = (e) => newIntegranteInputText = (e.target as HTMLInputElement).value;

    const addButton = document.createElement('button');
    addButton.textContent = 'Agregar Integrante';
    addButton.className = 'nav-button primary-button'; // Re-use button style
    addButton.onclick = () => { // This calls renderApp
        const trimmedText = newIntegranteInputText.trim().toUpperCase();
        if (trimmedText) {
            if (integrantes.some(i => normalizeStringForComparison(i.nombre) === normalizeStringForComparison(trimmedText))) {
                alert('Este integrante ya existe.');
                return;
            }
            integrantes.push({ id: nextIntegranteId++, nombre: trimmedText });
            saveIntegrantesToLocalStorage();
            newIntegranteInputText = '';
            editingIntegranteId = null;
            // integrantesSearchTerm = ''; // Clear search
            // _updateIntegrantesManagementList(integrantesSearchTerm, integrantesSortOrder); // Update list
            const mainArea = document.getElementById('main-content-area');
            if(mainArea) mainContentScrollTop = mainArea.scrollTop;
            focusTargetId = INTEGRANTE_SEARCH_INPUT_ID;
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
        _updateIntegrantesManagementList(integrantesSearchTerm, integrantesSortOrder); // Update list on sort change
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


    const listContainerUL = document.createElement('ul');
    listContainerUL.id = INTEGRANTES_LIST_CONTAINER_ID;
    listContainerUL.className = 'razones-list'; // Re-use list style
    parentElement.appendChild(listContainerUL);
    
    _updateIntegrantesManagementList(integrantesSearchTerm, integrantesSortOrder); // Initial population
}


// Initialize theme
loadTheme();
// Initial render
renderApp();