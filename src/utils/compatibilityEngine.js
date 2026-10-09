export const checkCompatibility = (build) => {
  const warnings = [];
  const errors = [];
  let totalWattage = 0;

  // Calculate wattage
  Object.values(build).forEach(component => {
    if (component && component.wattage) {
      totalWattage += component.wattage;
    }
  });

  // 1. CPU and Motherboard Socket Check
  if (build.cpu && build.motherboard) {
    if (build.cpu.socket !== build.motherboard.socket) {
      errors.push(`Soket tidak cocok: CPU ${build.cpu.brand} (${build.cpu.socket}) tidak bisa dipasang di Motherboard ${build.motherboard.brand} (${build.motherboard.socket}).`);
    }
  }

  // 2. Motherboard and RAM Type Check
  if (build.motherboard && build.ram) {
    if (build.motherboard.ramType !== build.ram.ramType) {
      errors.push(`Tipe RAM tidak cocok: Motherboard mendukung ${build.motherboard.ramType}, tetapi RAM yang dipilih adalah ${build.ram.ramType}.`);
    }
  }

  // 3. Power Supply Capacity Check
  if (build.psu) {
    // Add 20% overhead for safety
    const recommendedWattage = totalWattage * 1.2;
    if (build.psu.capacity < recommendedWattage) {
      warnings.push(`Kapasitas PSU (${build.psu.capacity}W) mungkin terlalu mepet atau kurang. Direkomendasikan minimal ${Math.ceil(recommendedWattage)}W.`);
    }
  } else {
    warnings.push("PSU belum dipilih. Pastikan PSU cukup untuk menyuplai semua komponen.");
  }

  // 4. Case and Motherboard Form Factor Check
  if (build.case && build.motherboard) {
    if (!build.case.formFactor.includes(build.motherboard.formFactor)) {
      errors.push(`Motherboard ${build.motherboard.formFactor} tidak muat di dalam Casing yang dipilih.`);
    }
  }

  return { errors, warnings, totalWattage };
};

export const calculateTotal = (build) => {
  return Object.values(build).reduce((total, component) => {
    return total + (component ? component.price : 0);
  }, 0);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};
