export function NovaMockup() {
  const items = [
    ['Linen Tote', '¥ 128.000'],
    ['Kyo Bag', '¥ 186.000'],
    ['Washi Sleeve', '¥ 92.000'],
    ['Ink Cardholder', '¥ 64.000'],
  ];
  return (
    <div className="mockup mockup-nova">
      <div className="mn-chrome">
        <i /><i /><i />
        <span>nova-commerce.id</span>
      </div>
      <div className="mn-body">
        <div className="mn-tag">Shop · New Arrivals</div>
        <div className="mn-grid">
          {items.map(([name, price]) => (
            <div className="mn-card" key={name}>
              <div className="img" />
              <div className="name">{name}</div>
              <div className="price">{price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AtlasMockup() {
  return (
    <div className="mockup mockup-atlas">
      <div className="ma-line">
        <span className="ma-prompt">$</span>
        <span className="ma-cmd">POST /v1/checkout</span>
      </div>
      <div className="ma-line"><span className="ma-status">200 OK · 42ms</span></div>
      <div className="ma-gap" />
      <div className="ma-line"><span className="ma-brace">{'{'}</span></div>
      <div className="ma-line">
        <span className="ma-json">
          &nbsp;&nbsp;<span className="ma-key">"id"</span>: <span className="ma-val">"ch_3NxK8a"</span>,
        </span>
      </div>
      <div className="ma-line">
        <span className="ma-json">
          &nbsp;&nbsp;<span className="ma-key">"amount"</span>: <span className="ma-val">128000</span>,
        </span>
      </div>
      <div className="ma-line">
        <span className="ma-json">
          &nbsp;&nbsp;<span className="ma-key">"currency"</span>: <span className="ma-val">"IDR"</span>,
        </span>
      </div>
      <div className="ma-line">
        <span className="ma-json">
          &nbsp;&nbsp;<span className="ma-key">"status"</span>: <span className="ma-val">"succeeded"</span>
        </span>
      </div>
      <div className="ma-line"><span className="ma-brace">{'}'}</span></div>
    </div>
  );
}

export function LumenMockup() {
  const swatches = [
    ['#171612', 'INK'],
    ['#A62F24', 'SEAL'],
    ['#B5985A', 'GOLD'],
    ['#6A6458', 'INK 2'],
    ['#A69E8F', 'INK 3'],
    ['#EFE9DC', 'PAPER'],
  ];
  return (
    <div className="mockup mockup-lumen">
      <div className="ml-label">Color tokens</div>
      <div className="ml-swatches">
        {swatches.map(([bg, label]) => (
          <div className="ml-swatch" key={label} style={{ background: bg }} data-label={label} />
        ))}
      </div>
      <div className="ml-components">
        <div className="ml-btn">Primary</div>
        <div className="ml-btn outline">Ghost</div>
        <div className="ml-avatars" style={{ marginLeft: 'auto' }}>
          <div className="ml-avatar" />
          <div className="ml-avatar" />
          <div className="ml-avatar" />
        </div>
      </div>
    </div>
  );
}

export function OrbitMockup() {
  const bars = [38, 55, 42, 88, 60, 72];
  return (
    <div className="mockup mockup-orbit">
      <div className="mo-head">
        <span className="mo-title">Revenue · Q4</span>
        <span className="mo-period">OCT — DEC</span>
      </div>
      <div className="mo-chart">
        {bars.map((h, i) => (
          <div className="mo-bar" key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="mo-axis">
        <span>Oct</span><span>Nov</span><span>Dec</span>
      </div>
    </div>
  );
}