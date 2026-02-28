const HeroSection = () => {
  return (
    <section className="w-full min-h-screen bg-[var(--color-primary)] text-[var(--color-secondary)] flex flex-col">
      {/* Contact Info Bar */}
      <div className="w-full bg-[var(--color-secondary)]/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {/* Social Icons */}
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] hover:opacity-80 transition">
                <span className="text-lg">💬</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] hover:opacity-80 transition">
                <span className="text-lg">✈️</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] hover:opacity-80 transition">
                <span className="text-lg">VK</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] hover:opacity-80 transition">
                <span className="text-lg">👤</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] hover:opacity-80 transition">
                <span className="text-lg">@</span>
              </button>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
              <input
                type="email"
                placeholder="info@lavandamed.ru"
                className="px-4 py-2 rounded-full bg-[var(--color-primary)]/80 border border-[var(--color-secondary)]/40 focus:outline-none focus:border-[var(--color-secondary)] text-sm"
                defaultValue="info@lavandamed.ru"
              />
              <a
                href="tel:+79802444401"
                className="px-4 py-2 rounded-full bg-[var(--color-secondary)]/20 hover:bg-[var(--color-secondary)]/30 transition text-sm font-medium"
              >
                +7 (980) 244-44-01
              </a>
              <a
                href="tel:+79802444400"
                className="px-4 py-2 rounded-full bg-[var(--color-secondary)]/20 hover:bg-[var(--color-secondary)]/30 transition text-sm font-medium"
              >
                +7 (980) 244-44-00
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 md:py-24">
        {/* Main Heading */}
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[var(--color-secondary)] mb-4">
            Медицинский центр
          </h1>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif italic text-[var(--color-secondary)] mb-12">
            Лаванда
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-[var(--color-secondary)]/80 leading-relaxed max-w-xl mx-auto">
            Медицинский центр «Лаванда» – это место, где современное
            оборудование, опытные специалисты и внимательное отношение к каждому
            пациенту создают комфортные условия для качественной диагностики и
            лечения
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
