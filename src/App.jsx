import { useState } from 'react'
import { Plus, Trash2, Cpu, HardDrive, Zap, AlertTriangle, CheckCircle, Info, Box } from 'lucide-react'
import { components, categories } from './data/components'
import { checkCompatibility, calculateTotal, formatCurrency } from './utils/compatibilityEngine'
import PCViewer3D from './components/PCViewer3D'
import './App.css'

function App() {
  const [build, setBuild] = useState({
    cpu: null,
    motherboard: null,
    ram: null,
    gpu: null,
    storage: null,
    psu: null,
    case: null,
    cooler: null
  });

  const [activeCategory, setActiveCategory] = useState(null);

  const handleSelectComponent = (category, component) => {
    setBuild(prev => ({ ...prev, [category]: component }));
    setActiveCategory(null);
  };

  const handleRemoveComponent = (category) => {
    setBuild(prev => ({ ...prev, [category]: null }));
  };

  const { errors, warnings, totalWattage } = checkCompatibility(build);
  const totalPrice = calculateTotal(build);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'cpu': return <Cpu size={24} />;
      case 'storage': return <HardDrive size={24} />;
      case 'psu': return <Zap size={24} />;
      case 'case': return <Box size={24} />;
      default: return <Info size={24} />;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Simulasi Rakit PC Profesional</h1>
        <p>Pilih komponen untuk melihat simulasi 3D rakitan Anda.</p>
      </header>

      <main className="main-content">
        {/* Left Column: Builder List */}
        <section className="builder-column">
          <div className="surface-panel builder-list">
            {Object.keys(categories).map(category => {
              const item = build[category];
              return (
                <div key={category} className="builder-slot">
                  {item ? (
                    <>
                      <img src={item.image} alt={item.name} className="slot-image" />
                      <div className="slot-info">
                        <div className="slot-category">{categories[category]}</div>
                        <div className="slot-name">{item.name}</div>
                        <div className="slot-details">
                          <span>{item.brand}</span>
                          {item.wattage > 0 && <span>• {item.wattage}W</span>}
                        </div>
                      </div>
                      <div className="slot-actions">
                        <div className="slot-price">{formatCurrency(item.price)}</div>
                        <button 
                          className="btn btn-danger" 
                          onClick={() => handleRemoveComponent(category)}
                          title="Hapus komponen"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="slot-icon">
                        {getCategoryIcon(category)}
                      </div>
                      <div className="slot-info">
                        <div className="slot-category">{categories[category]}</div>
                        <div className="slot-empty">Belum dipilih</div>
                      </div>
                      <button 
                        className="btn btn-primary"
                        onClick={() => setActiveCategory(category)}
                      >
                        <Plus size={16} /> Pilih
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Right Column: 3D Viewer & Summary */}
        <aside className="sidebar-column">
          
          {/* 3D Viewer Panel */}
          <div className="surface-panel viewer-container">
            <PCViewer3D build={build} />
          </div>

          {/* Summary Panel */}
          <div className="surface-panel summary-panel">
            <h2 className="summary-title">Ringkasan Rakitan</h2>
            
            <div className="summary-row">
              <span>Item Terpilih</span>
              <span>{Object.values(build).filter(i => i !== null).length} / 8</span>
            </div>
            
            <div className="wattage-info">
              <span>Estimasi Daya</span>
              <span className="wattage-val"><Zap size={14} style={{display:'inline', verticalAlign:'middle', marginRight:'4px'}}/>{totalWattage} W</span>
            </div>

            <div className="summary-row total">
              <span>Total Estimasi</span>
              <span style={{color: 'var(--success)'}}>{formatCurrency(totalPrice)}</span>
            </div>

            <div className="alerts-container">
              {errors.map((err, i) => (
                <div key={`err-${i}`} className="alert alert-error">
                  <AlertTriangle size={18} style={{flexShrink: 0}} />
                  <div>{err}</div>
                </div>
              ))}
              {warnings.map((warn, i) => (
                <div key={`warn-${i}`} className="alert alert-warning">
                  <Info size={18} style={{flexShrink: 0}} />
                  <div>{warn}</div>
                </div>
              ))}
              {errors.length === 0 && warnings.length === 0 && Object.values(build).some(i => i !== null) && (
                <div className="alert" style={{backgroundColor: 'var(--success-bg)', color: 'var(--success)', borderColor: 'rgba(16, 185, 129, 0.2)'}}>
                  <CheckCircle size={18} style={{flexShrink: 0}} />
                  <div>Semua komponen kompatibel.</div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </main>

      {/* Component Picker Modal */}
      {activeCategory && (
        <div className="modal-overlay" onClick={() => setActiveCategory(null)}>
          <div className="surface-panel modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{fontSize: '1.25rem', fontWeight: 600}}>Pilih {categories[activeCategory]}</h3>
              <button className="btn" onClick={() => setActiveCategory(null)}>Tutup</button>
            </div>
            <div className="modal-body">
              {components[activeCategory]?.map(comp => (
                <div 
                  key={comp.id} 
                  className="component-card"
                  onClick={() => handleSelectComponent(activeCategory, comp)}
                >
                  <img src={comp.image} alt={comp.name} className="card-img" />
                  <div className="card-name">{comp.name}</div>
                  <div className="card-specs">
                    {comp.brand} 
                    {comp.socket && ` • ${comp.socket}`}
                    {comp.ramType && ` • ${comp.ramType}`}
                  </div>
                  <div className="card-price">{formatCurrency(comp.price)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
