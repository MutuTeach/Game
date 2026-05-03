import React, { useState, useMemo, useEffect } from 'react';
import {
  Heart, X, Check, ChevronRight, BookOpen, Trophy, Flame,
  Home, RefreshCw, Filter, Award, Target, Zap, Play, ArrowLeft
} from 'lucide-react';

// ============================================================================
// QUESTION BANK
// ~50 questions covering pages 11-35 (Tema 1, 2, 3, 4)
// Each: Spanish + Russian, 3 options, page reference, explanation
// ============================================================================

const QUESTIONS = [
  // ============ TEMA 1 — DEFINICIONES (page 11) ============
  {
    id: 1, tema: 1, page: 11, difficulty: 'easy',
    es: {
      q: "¿Cuál es la masa máxima autorizada (MMA) de un vehículo de categoría N1?",
      opts: ["Inferior o igual a 750 kg", "Inferior o igual a 3.500 kg", "Superior a 3.500 kg pero no superior a 12 toneladas"],
      correct: 1,
      exp: "Los vehículos N1 transportan mercancías y tienen una MMA igual o inferior a 3.500 kg. Se pueden conducir con permiso B."
    },
    ru: {
      q: "Какова максимально разрешённая масса (MMA) транспортного средства категории N1?",
      opts: ["Не более 750 кг", "Не более 3.500 кг", "Свыше 3.500 кг, но не более 12 тонн"],
      correct: 1,
      exp: "Транспортные средства N1 предназначены для перевозки грузов и имеют MMA не более 3.500 кг. Управляются с правами категории B."
    }
  },
  {
    id: 2, tema: 1, page: 11, difficulty: 'easy',
    es: {
      q: "Los vehículos de categoría M están concebidos principalmente para:",
      opts: ["Transporte de mercancías", "Transporte de personas y su equipaje", "Servicio de remolque"],
      correct: 1,
      exp: "M = personas (M1: turismos, M2/M3: autobuses). N = mercancías. O = remolques."
    },
    ru: {
      q: "Транспортные средства категории M предназначены главным образом для:",
      opts: ["Перевозки грузов", "Перевозки людей и их багажа", "Буксировки прицепов"],
      correct: 1,
      exp: "M = люди (M1: легковые, M2/M3: автобусы). N = грузы. O = прицепы."
    }
  },
  {
    id: 3, tema: 1, page: 11, difficulty: 'medium',
    es: {
      q: "Un autobús con más de 8 plazas (sin contar al conductor) y MMA superior a 5 toneladas pertenece a la categoría:",
      opts: ["M1", "M2", "M3"],
      correct: 2,
      exp: "M2 = >8 plazas, MMA ≤ 5 t. M3 = >8 plazas, MMA > 5 t. M1 = máximo 8 plazas además del conductor."
    },
    ru: {
      q: "Автобус с более чем 8 местами (не считая водителя) и MMA свыше 5 тонн относится к категории:",
      opts: ["M1", "M2", "M3"],
      correct: 2,
      exp: "M2 = >8 мест, MMA ≤ 5 т. M3 = >8 мест, MMA > 5 т. M1 = максимум 8 мест помимо водителя."
    }
  },
  {
    id: 4, tema: 1, page: 11, difficulty: 'medium',
    es: {
      q: "Un remolque con MMA de 600 kg pertenece a la categoría:",
      opts: ["O1", "O2", "O3"],
      correct: 0,
      exp: "O1: MMA ≤ 750 kg. O2: 750 kg < MMA ≤ 3.500 kg. O3: 3.500 kg < MMA ≤ 10 t."
    },
    ru: {
      q: "Прицеп с MMA 600 кг относится к категории:",
      opts: ["O1", "O2", "O3"],
      correct: 0,
      exp: "O1: MMA ≤ 750 кг. O2: 750 кг < MMA ≤ 3.500 кг. O3: 3.500 кг < MMA ≤ 10 т."
    }
  },
  {
    id: 5, tema: 1, page: 11, difficulty: 'medium',
    es: {
      q: "La masa máxima autorizada (MMA) de un vehículo se refiere a:",
      opts: ["El peso del vehículo cuando está vacío (sin carga ni pasajeros)", "La masa máxima permitida para circular por vías públicas con carga", "Solo el peso de la carga, sin contar el vehículo"],
      correct: 1,
      exp: "MMA es la masa máxima total con carga permitida en circulación. El peso vacío se llama 'tara'."
    },
    ru: {
      q: "Максимально разрешённая масса (MMA) транспортного средства означает:",
      opts: ["Вес пустого транспортного средства (без груза и пассажиров)", "Максимально допустимая масса для движения по дорогам общего пользования с грузом", "Только вес груза, без учёта транспортного средства"],
      correct: 1,
      exp: "MMA — максимальная общая масса с грузом, разрешённая в движении. Снаряжённая масса называется 'тара'."
    }
  },

  // ============ TEMA 2 — UTILIZACIÓN DE LA VÍA (pages 12-24) ============
  {
    id: 6, tema: 2, page: 12, difficulty: 'easy',
    es: {
      q: "Una calzada se considera estrecha cuando su anchura es de:",
      opts: ["6,5 metros o menos", "8 metros o menos", "3 metros o menos"],
      correct: 0,
      exp: "Calzada estrecha = 6,5 m o menos. No confundir con carril estrecho (< 3 m)."
    },
    ru: {
      q: "Проезжая часть считается узкой, когда её ширина составляет:",
      opts: ["6,5 метра или меньше", "8 метров или меньше", "3 метра или меньше"],
      correct: 0,
      exp: "Узкая проезжая часть = 6,5 м или меньше. Не путать с узкой полосой (<3 м)."
    }
  },
  {
    id: 7, tema: 2, page: 12, difficulty: 'medium',
    es: {
      q: "La plataforma de una vía está formada por:",
      opts: ["Solo la calzada", "La calzada y los arcenes", "La calzada, los arcenes y las aceras"],
      correct: 1,
      exp: "Plataforma = calzada + arcenes. Las aceras NO forman parte de la plataforma."
    },
    ru: {
      q: "Платформа дороги состоит из:",
      opts: ["Только проезжей части", "Проезжей части и обочин", "Проезжей части, обочин и тротуаров"],
      correct: 1,
      exp: "Платформа = проезжая часть + обочины. Тротуары НЕ входят в платформу."
    }
  },
  {
    id: 8, tema: 2, page: 12, difficulty: 'medium',
    es: {
      q: "Un carril se considera estrecho cuando su anchura es:",
      opts: ["Inferior a 3 metros", "Inferior a 6,5 metros", "Inferior a 4 metros"],
      correct: 0,
      exp: "Carril estrecho = anchura inferior a 3 metros."
    },
    ru: {
      q: "Полоса движения считается узкой, когда её ширина:",
      opts: ["Менее 3 метров", "Менее 6,5 метров", "Менее 4 метров"],
      correct: 0,
      exp: "Узкая полоса = ширина менее 3 метров."
    }
  },
  {
    id: 9, tema: 2, page: 13, difficulty: 'medium',
    es: {
      q: "Una zona de frenado de emergencia es:",
      opts: ["Un ensanchamiento para detener vehículos sin interrumpir la circulación", "Una zona para detener un vehículo cuyo sistema de frenado ha fallado", "Un carril reservado para servicios de emergencia"],
      correct: 1,
      exp: "Es la zona de escape para vehículos con fallo de frenos. El ensanchamiento normal se llama 'apartadero'."
    },
    ru: {
      q: "Зона аварийного торможения — это:",
      opts: ["Расширение для остановки ТС без прерывания движения", "Зона для остановки ТС с отказавшей тормозной системой", "Полоса для экстренных служб"],
      correct: 1,
      exp: "Это зона ухода для ТС с отказом тормозов. Обычное расширение называется 'apartadero'."
    }
  },
  {
    id: 10, tema: 2, page: 14, difficulty: 'medium',
    es: {
      q: "En una glorieta, ¿cómo se realiza la circulación?",
      opts: ["Los vehículos se cruzan a nivel en la isleta central", "Los tramos confluyen en un anillo con circulación rotatoria alrededor de una isleta central", "Solo se permite el cambio de sentido en el centro"],
      correct: 1,
      exp: "Glorieta (rotonda) = anillo de circulación rotatoria. Las 'glorietas partidas' no se consideran verdaderas glorietas."
    },
    ru: {
      q: "Как происходит движение на круговом перекрёстке (glorieta)?",
      opts: ["ТС пересекаются на одном уровне в центральном островке", "Дороги соединяются в кольцо с круговым движением вокруг центрального островка", "В центре разрешён только разворот"],
      correct: 1,
      exp: "Glorieta = кольцо с круговым движением. 'Разделённые glorietas' не считаются настоящими."
    }
  },
  {
    id: 11, tema: 2, page: 15, difficulty: 'hard',
    es: {
      q: "¿Cuál de estas vías ciclistas discurre adosada a la calzada en un solo sentido o en doble sentido?",
      opts: ["Acera-bici", "Carril-bici", "Senda ciclopeatonal"],
      correct: 1,
      exp: "Carril-bici = adosado a la calzada. Acera-bici = sobre la acera. Pista-bici = independiente. Senda ciclopeatonal = compartida con peatones, en parques."
    },
    ru: {
      q: "Какая из велосипедных дорожек примыкает к проезжей части в одном или двух направлениях?",
      opts: ["Acera-bici (на тротуаре)", "Carril-bici (велополоса)", "Senda ciclopeatonal"],
      correct: 1,
      exp: "Carril-bici = примыкает к проезжей части. Acera-bici = на тротуаре. Pista-bici = отдельная. Senda ciclopeatonal = общая с пешеходами."
    }
  },
  {
    id: 12, tema: 2, page: 15, difficulty: 'hard',
    es: {
      q: "Una vía para peatones, ciclos y, en su caso, VMP, segregada del tráfico motorizado, que discurre habitualmente por espacios abiertos como parques o jardines, se denomina:",
      opts: ["Carril-bici protegido", "Pista-bici", "Senda ciclopeatonal"],
      correct: 2,
      exp: "Senda ciclopeatonal = compartida peatones + ciclos + VMP, en parques/jardines/bosques."
    },
    ru: {
      q: "Дорожка для пешеходов, велосипедов и VMP, отделённая от автотранспорта, обычно проходящая через парки или сады, называется:",
      opts: ["Carril-bici protegido", "Pista-bici", "Senda ciclopeatonal"],
      correct: 2,
      exp: "Senda ciclopeatonal = общая для пешеходов + велосипедов + VMP, в парках/садах/лесах."
    }
  },
  {
    id: 13, tema: 2, page: 16, difficulty: 'easy',
    es: {
      q: "Una vía urbana es:",
      opts: ["Toda vía pública situada dentro de poblado, excepto las travesías", "Cualquier vía dentro de la ciudad incluyendo travesías", "Solo las calles principales del centro"],
      correct: 0,
      exp: "Vía urbana = dentro de poblado, EXCEPTO travesías. La travesía es una carretera que atraviesa un poblado."
    },
    ru: {
      q: "Городская дорога — это:",
      opts: ["Любая общественная дорога внутри населённого пункта, за исключением travesías", "Любая дорога внутри города, включая travesías", "Только главные улицы центра"],
      correct: 0,
      exp: "Городская дорога = внутри населённого пункта, КРОМЕ travesía. Travesía — это шоссе, проходящее через населённый пункт."
    }
  },
  {
    id: 14, tema: 2, page: 17, difficulty: 'hard',
    es: {
      q: "¿Cuál es la diferencia principal entre una autopista y una autovía?",
      opts: ["La autopista permite mayor velocidad que la autovía", "La autopista no tiene acceso a las propiedades colindantes; la autovía tiene acceso limitado", "La autovía siempre es de peaje"],
      correct: 1,
      exp: "Autopista = SIN acceso a colindantes. Autovía = acceso LIMITADO. Velocidad máxima es la misma (120 km/h)."
    },
    ru: {
      q: "В чём главное различие между autopista и autovía?",
      opts: ["На autopista разрешена большая скорость", "На autopista нет доступа к прилегающим территориям; на autovía доступ ограничен", "Autovía всегда платная"],
      correct: 1,
      exp: "Autopista = НЕТ доступа к прилегающим. Autovía = ОГРАНИЧЕННЫЙ доступ. Макс. скорость одинакова (120 км/ч)."
    }
  },
  {
    id: 15, tema: 2, page: 17, difficulty: 'medium',
    es: {
      q: "Una carretera convencional es:",
      opts: ["Una carretera que solo permite circular a turismos", "Una carretera que reúne las características de autopista y autovía", "Una carretera que NO reúne las características de autopista, autovía ni vía para automóviles"],
      correct: 2,
      exp: "Convencional = todo lo que no es autopista/autovía/vía para automóviles. La mayoría de carreteras secundarias."
    },
    ru: {
      q: "Обычная дорога (carretera convencional) — это:",
      opts: ["Дорога, по которой могут ехать только легковые ТС", "Дорога, которая сочетает характеристики autopista и autovía", "Дорога, которая НЕ имеет характеристик autopista, autovía или vía para automóviles"],
      correct: 2,
      exp: "Convencional = всё, что не autopista/autovía/vía para automóviles. Большинство второстепенных дорог."
    }
  },
  {
    id: 16, tema: 2, page: 18, difficulty: 'medium',
    es: {
      q: "En una calzada con tres carriles separados por marcas longitudinales discontinuas y doble sentido, ¿qué uso tiene el carril central?",
      opts: ["Sólo para adelantar y para cambiar de dirección hacia la izquierda", "Para circulación normal del sentido derecho", "Para cambiar el sentido de la marcha"],
      correct: 0,
      exp: "Carril central de una vía con 3 carriles y doble sentido: SÓLO adelantar y girar a la izquierda. NUNCA para U-turn."
    },
    ru: {
      q: "На проезжей части с тремя полосами, разделёнными прерывистой разметкой, и двусторонним движением, для чего используется центральная полоса?",
      opts: ["Только для обгона и поворота налево", "Для обычного движения в правом направлении", "Для разворота"],
      correct: 0,
      exp: "Центральная полоса на дороге с 3 полосами и двусторонним движением: ТОЛЬКО обгон и поворот налево. НИКОГДА для разворота."
    }
  },
  {
    id: 17, tema: 2, page: 18, difficulty: 'easy',
    es: {
      q: "¿Qué color en los paneles informativos de niveles de circulación indica que la carretera está cortada?",
      opts: ["Rojo", "Amarillo", "Negro"],
      correct: 2,
      exp: "Blanco/normal = fluida. Verde = condicionada. Amarillo = irregular. Rojo = difícil. Negro = interrumpida (cortada)."
    },
    ru: {
      q: "Какой цвет на информационных панелях указывает, что дорога перекрыта?",
      opts: ["Красный", "Жёлтый", "Чёрный"],
      correct: 2,
      exp: "Белый = свободно. Зелёный = условно. Жёлтый = нестабильно. Красный = затруднено. Чёрный = перекрыто."
    }
  },
  {
    id: 18, tema: 2, page: 19, difficulty: 'medium',
    es: {
      q: "Dentro de poblado, en una vía urbana con dos o más carriles reservados para su sentido, los automóviles:",
      opts: ["Deben circular siempre por el carril derecho", "Pueden utilizar el carril que mejor convenga a su destino, sin abandonarlo salvo para maniobras", "Sólo pueden cambiar de carril en intersecciones"],
      correct: 1,
      exp: "Dentro de poblado con 2+ carriles: cualquier carril útil al destino, sin obstaculizar. Esta regla NO se aplica en autopistas/autovías dentro de poblado."
    },
    ru: {
      q: "В населённом пункте на городской дороге с двумя или более полосами в одном направлении автомобили:",
      opts: ["Всегда должны двигаться по правой полосе", "Могут использовать любую подходящую полосу, не покидая её кроме как для манёвров", "Могут менять полосу только на перекрёстках"],
      correct: 1,
      exp: "В населённом пункте с 2+ полосами: любая удобная полоса. Это правило НЕ действует на autopistas/autovías в населённом пункте."
    }
  },
  {
    id: 19, tema: 2, page: 20, difficulty: 'hard',
    es: {
      q: "Para circular por un carril VAO, ¿qué requisitos debe cumplir un vehículo?",
      opts: ["Estar destinado al transporte de personas, MMA ≤ 3.500 kg y llevar el número de ocupantes especificado", "Ser un vehículo eléctrico", "Tener al menos 2 ocupantes"],
      correct: 0,
      exp: "VAO requiere las TRES condiciones: transporte de personas + MMA ≤ 3.500 kg + ocupación mínima especificada en panel."
    },
    ru: {
      q: "Какие требования должны выполняться, чтобы ехать по полосе VAO?",
      opts: ["Транспорт людей, MMA ≤ 3.500 кг и указанное количество пассажиров", "Быть электромобилем", "Иметь не менее 2 пассажиров"],
      correct: 0,
      exp: "VAO требует ТРИ условия: перевозка людей + MMA ≤ 3.500 кг + минимальное количество пассажиров с панели."
    }
  },
  {
    id: 20, tema: 2, page: 21, difficulty: 'medium',
    es: {
      q: "Los carriles reversibles están delimitados por:",
      opts: ["Una sola línea continua amarilla", "Marcas dobles discontinuas a ambos lados", "Una línea continua y otra discontinua"],
      correct: 1,
      exp: "Reversibles = doble línea discontinua a ambos lados (porque cambia el sentido según necesidad)."
    },
    ru: {
      q: "Реверсивные полосы обозначаются:",
      opts: ["Одной сплошной жёлтой линией", "Двойной прерывистой разметкой с обеих сторон", "Сплошной и прерывистой линией"],
      correct: 1,
      exp: "Реверсивные = двойная прерывистая с обеих сторон (т.к. направление меняется по необходимости)."
    }
  },
  {
    id: 21, tema: 2, page: 22, difficulty: 'hard',
    es: {
      q: "En un carril habilitado en sentido contrario al habitual por fluidez de la circulación, ¿qué vehículos pueden utilizarlo?",
      opts: ["Cualquier vehículo", "Sólo motocicletas y turismos sin remolque", "Sólo vehículos pesados"],
      correct: 1,
      exp: "Carril en sentido contrario habitual: SÓLO motocicletas y turismos. Está PROHIBIDO incluso para turismos con remolque."
    },
    ru: {
      q: "По полосе, открытой в обратном привычному направлении для облегчения движения, могут ехать:",
      opts: ["Любые ТС", "Только мотоциклы и легковые без прицепа", "Только грузовые"],
      correct: 1,
      exp: "Полоса в обратном направлении: ТОЛЬКО мотоциклы и легковые. ЗАПРЕЩЕНО даже легковым с прицепом."
    }
  },
  {
    id: 22, tema: 2, page: 23, difficulty: 'easy',
    es: {
      q: "¿Cuál de los siguientes vehículos NO puede circular por una autopista?",
      opts: ["Una motocicleta de 250cc", "Un ciclomotor", "Un autobús"],
      correct: 1,
      exp: "Prohibidos en autopista/autovía: animales, tracción animal, bicicletas (con excepción), ciclomotores, mov. reducida, VMP, peatones."
    },
    ru: {
      q: "Какое из следующих ТС НЕ может ехать по autopista?",
      opts: ["Мотоцикл 250 куб.см", "Мопед (ciclomotor)", "Автобус"],
      correct: 1,
      exp: "Запрещены на autopista/autovía: животные, гужевой транспорт, велосипеды (с исключением), мопеды, ТС инвалидов, VMP, пешеходы."
    }
  },
  {
    id: 23, tema: 2, page: 23, difficulty: 'hard',
    es: {
      q: "¿Es posible que una bicicleta circule legalmente por una autopista o autovía?",
      opts: ["No, nunca", "Sí, si el ciclista es mayor de 14 años puede usar el arcén de la autovía (no de la autopista), salvo señalización contraria", "Sí, en ambas vías sin restricciones"],
      correct: 1,
      exp: "Bicicletas: PROHIBIDAS en autopista. En AUTOVÍA: permitidas en arcén si conductor >14 años, salvo señal contraria. NUNCA en autopista."
    },
    ru: {
      q: "Может ли велосипед законно ехать по autopista или autovía?",
      opts: ["Нет, никогда", "Да, если велосипедист старше 14 лет, он может использовать обочину autovía (не autopista), если иное не указано", "Да, везде без ограничений"],
      correct: 1,
      exp: "Велосипеды: ЗАПРЕЩЕНЫ на autopista. На AUTOVÍA: разрешены по обочине, если водитель >14 лет, кроме случаев запрета знаком. НИКОГДА на autopista."
    }
  },
  {
    id: 24, tema: 2, page: 23, difficulty: 'medium',
    es: {
      q: "Si un vehículo se inmoviliza por avería en una autopista, ¿qué deben hacer los ocupantes?",
      opts: ["Ninguno puede transitar por la calzada", "Deben empujar el vehículo hasta el arcén", "Pueden caminar por el arcén con un chaleco"],
      correct: 0,
      exp: "En autopista/autovía con vehículo inmovilizado: NINGUNO de los ocupantes puede transitar por la calzada."
    },
    ru: {
      q: "Если ТС остановилось из-за поломки на autopista, что должны сделать пассажиры?",
      opts: ["Никто не может находиться на проезжей части", "Должны толкать ТС до обочины", "Могут идти по обочине в жилете"],
      correct: 0,
      exp: "На autopista/autovía с остановившимся ТС: НИКТО из пассажиров не может находиться на проезжей части."
    }
  },
  {
    id: 25, tema: 2, page: 24, difficulty: 'hard',
    es: {
      q: "En el adelantamiento por el arcén, ¿qué duración o distancia máxima se permite?",
      opts: ["15 segundos o 200 metros", "30 segundos o 500 metros", "10 segundos o 100 metros"],
      correct: 0,
      exp: "Sollama por arcén: máximo 15 segundos O 200 metros. Si se excede, se considera adelantamiento prohibido. Bicicletas son excepción."
    },
    ru: {
      q: "Какова максимальная длительность или дистанция при обгоне по обочине?",
      opts: ["15 секунд или 200 метров", "30 секунд или 500 метров", "10 секунд или 100 метров"],
      correct: 0,
      exp: "Обгон по обочине: максимум 15 секунд ИЛИ 200 метров. При превышении — обгон запрещён. Исключение — велосипеды."
    }
  },
  {
    id: 26, tema: 2, page: 24, difficulty: 'medium',
    es: {
      q: "¿Quién está obligado a circular por el arcén si es transitable y suficiente?",
      opts: ["Todos los vehículos sin excepción", "Vehículos de tracción animal, especiales con MMA ≤ 3.500 kg, ciclos, ciclomotores y vehículos de movilidad reducida", "Sólo los ciclistas"],
      correct: 1,
      exp: "Obligados al arcén: tracción animal, especiales ≤3.500 kg, ciclos, ciclomotores, mov. reducida, vehículos siguiendo a ciclistas."
    },
    ru: {
      q: "Кто обязан ехать по обочине, если она проходима и достаточна?",
      opts: ["Все ТС без исключения", "Гужевой транспорт, спецтранспорт MMA ≤ 3.500 кг, велосипеды, мопеды и ТС инвалидов", "Только велосипедисты"],
      correct: 1,
      exp: "Обязаны ехать по обочине: гужевой, спец ≤3.500 кг, велосипеды, мопеды, ТС инвалидов, ТС следующие за велосипедистами."
    }
  },

  // ============ TEMA 3 — VELOCIDAD Y DISTANCIAS (pages 25-32) ============
  {
    id: 27, tema: 3, page: 25, difficulty: 'hard',
    es: {
      q: "Si circulo a 70 km/h por una vía con placas de hielo cuando el límite es 90 km/h, ¿estoy infringiendo alguna norma?",
      opts: ["No, voy por debajo del límite máximo", "Sí, estoy circulando a velocidad excesiva aunque no rebase el límite máximo", "Sólo si tengo un accidente"],
      correct: 1,
      exp: "Velocidad excesiva = superior a la adecuada. Puede haberla SIN rebasar el límite máximo si las condiciones lo requieren. Es sancionable."
    },
    ru: {
      q: "Если я еду 70 км/ч по дороге с гололёдом, а ограничение 90 км/ч, нарушаю ли я какие-либо нормы?",
      opts: ["Нет, я иду ниже максимального предела", "Да, я еду с чрезмерной скоростью, даже не превышая максимум", "Только если попаду в ДТП"],
      correct: 1,
      exp: "Velocidad excesiva = выше адекватной. Может быть БЕЗ превышения макс. предела, если условия этого требуют. Карается штрафом."
    }
  },
  {
    id: 28, tema: 3, page: 27, difficulty: 'easy',
    es: {
      q: "Al aproximarse a una intersección debidamente señalizada con visibilidad prácticamente nula, la velocidad NO debe exceder de:",
      opts: ["30 km/h", "50 km/h", "70 km/h"],
      correct: 1,
      exp: "Intersección señalizada con visibilidad nula = máx. 50 km/h. Importante recordar este número exacto."
    },
    ru: {
      q: "При подъезде к обозначенному перекрёстку с практически нулевой видимостью скорость НЕ должна превышать:",
      opts: ["30 км/ч", "50 км/ч", "70 км/ч"],
      correct: 1,
      exp: "Обозначенный перекрёсток с нулевой видимостью = максимум 50 км/ч. Важное число для запоминания."
    }
  },
  {
    id: 29, tema: 3, page: 28, difficulty: 'easy',
    es: {
      q: "¿Cuál es la velocidad máxima genérica para un turismo en autopista (fuera de poblado)?",
      opts: ["100 km/h", "120 km/h", "130 km/h"],
      correct: 1,
      exp: "Turismo en autopista/autovía = 120 km/h máximo, 60 km/h mínimo."
    },
    ru: {
      q: "Какая максимальная общая скорость для легкового ТС на autopista (за городом)?",
      opts: ["100 км/ч", "120 км/ч", "130 км/ч"],
      correct: 1,
      exp: "Легковой на autopista/autovía = 120 км/ч максимум, 60 км/ч минимум."
    }
  },
  {
    id: 30, tema: 3, page: 28, difficulty: 'medium',
    es: {
      q: "Un autobús circulando por autopista tiene una velocidad máxima genérica de:",
      opts: ["120 km/h", "100 km/h", "90 km/h"],
      correct: 1,
      exp: "Autobús en autopista/autovía = 100 km/h (20 menos que turismo). Convencional: 90 km/h."
    },
    ru: {
      q: "Автобус на autopista имеет максимальную общую скорость:",
      opts: ["120 км/ч", "100 км/ч", "90 км/ч"],
      correct: 1,
      exp: "Автобус на autopista/autovía = 100 км/ч (на 20 меньше, чем легковой). На convencional = 90 км/ч."
    }
  },
  {
    id: 31, tema: 3, page: 28, difficulty: 'medium',
    es: {
      q: "Un camión con MMA superior a 3.500 kg en carretera convencional tiene una velocidad máxima de:",
      opts: ["90 km/h", "80 km/h", "70 km/h"],
      correct: 1,
      exp: "Camión >3.500 kg: autopista/autovía 90, convencional 80, sin pavimentar 30."
    },
    ru: {
      q: "Грузовик с MMA свыше 3.500 кг на обычной дороге имеет максимальную скорость:",
      opts: ["90 км/ч", "80 км/ч", "70 км/ч"],
      correct: 1,
      exp: "Грузовик >3.500 кг: autopista/autovía 90, convencional 80, без покрытия 30."
    }
  },
  {
    id: 32, tema: 3, page: 28, difficulty: 'hard',
    es: {
      q: "Un autobús que transporta menores en una carretera convencional debe reducir su velocidad máxima en:",
      opts: ["5 km/h", "10 km/h", "20 km/h"],
      correct: 1,
      exp: "Transporte escolar/menores o mercancías peligrosas → reducir 10 km/h sobre el máximo del vehículo + vía."
    },
    ru: {
      q: "Автобус, перевозящий несовершеннолетних, на обычной дороге должен снизить максимальную скорость на:",
      opts: ["5 км/ч", "10 км/ч", "20 км/ч"],
      correct: 1,
      exp: "Школьный/детский транспорт или опасные грузы → снижение на 10 км/ч от максимума ТС + дороги."
    }
  },
  {
    id: 33, tema: 3, page: 29, difficulty: 'easy',
    es: {
      q: "¿Cuál es la velocidad máxima genérica en una vía urbana de un único carril por sentido?",
      opts: ["20 km/h", "30 km/h", "50 km/h"],
      correct: 1,
      exp: "Desde 2021: plataforma única=20, 1 carril/sentido=30, 2+ carriles/sentido o travesías=50."
    },
    ru: {
      q: "Какова максимальная общая скорость на городской дороге с одной полосой в каждом направлении?",
      opts: ["20 км/ч", "30 км/ч", "50 км/ч"],
      correct: 1,
      exp: "С 2021 г.: plataforma única=20, 1 полоса/направление=30, 2+ полосы или travesías=50."
    }
  },
  {
    id: 34, tema: 3, page: 29, difficulty: 'medium',
    es: {
      q: "El límite de velocidad genérico en autopistas y autovías que transcurren dentro de poblado es:",
      opts: ["50 km/h", "80 km/h", "120 km/h"],
      correct: 1,
      exp: "Autopistas/autovías DENTRO de poblado = 80 km/h. ¡No 50, no 120!"
    },
    ru: {
      q: "Общий предел скорости на autopistas и autovías, проходящих внутри населённого пункта:",
      opts: ["50 км/ч", "80 км/ч", "120 км/ч"],
      correct: 1,
      exp: "Autopistas/autovías ВНУТРИ населённого пункта = 80 км/ч. Не 50, не 120!"
    }
  },
  {
    id: 35, tema: 3, page: 29, difficulty: 'medium',
    es: {
      q: "¿Cuál es la velocidad mínima genérica en autopistas y autovías?",
      opts: ["50 km/h", "60 km/h", "80 km/h"],
      correct: 1,
      exp: "Mínima en autopista/autovía = 60 km/h para todos los vehículos a motor. En otras vías = la mitad de la máxima."
    },
    ru: {
      q: "Какова минимальная общая скорость на autopistas и autovías?",
      opts: ["50 км/ч", "60 км/ч", "80 км/ч"],
      correct: 1,
      exp: "Минимум на autopista/autovía = 60 км/ч для всех моторных ТС. На других дорогах = половина максимума."
    }
  },
  {
    id: 36, tema: 3, page: 29, difficulty: 'hard',
    es: {
      q: "Para determinar la velocidad mínima de un vehículo, ¿se tienen en cuenta las circunstancias del conductor (por ejemplo, ser novel)?",
      opts: ["Sí, los conductores noveles tienen mínima reducida", "No, no se tienen en cuenta", "Sólo en autopistas"],
      correct: 1,
      exp: "Velocidad mínima NO depende del conductor (novel o no) ni del tipo de transporte. Sólo del vehículo y la vía."
    },
    ru: {
      q: "При определении минимальной скорости учитываются ли обстоятельства водителя (например, начинающий)?",
      opts: ["Да, у начинающих минимум снижен", "Нет, не учитываются", "Только на autopistas"],
      correct: 1,
      exp: "Минимальная скорость НЕ зависит от водителя (начинающий или нет) и типа перевозки. Только от ТС и дороги."
    }
  },
  {
    id: 37, tema: 3, page: 31, difficulty: 'medium',
    es: {
      q: "El tiempo de reacción normal de un conductor se considera de aproximadamente:",
      opts: ["0,25 segundos", "0,75 segundos", "1,5 segundos"],
      correct: 1,
      exp: "Tiempo de reacción normal = 0,75 segundos. NO depende de la velocidad. La distancia recorrida en ese tiempo, sí."
    },
    ru: {
      q: "Нормальное время реакции водителя составляет примерно:",
      opts: ["0,25 секунды", "0,75 секунды", "1,5 секунды"],
      correct: 1,
      exp: "Нормальное время реакции = 0,75 секунды. НЕ зависит от скорости. Пройденное за это время расстояние — да."
    }
  },
  {
    id: 38, tema: 3, page: 31, difficulty: 'hard',
    es: {
      q: "Si un vehículo duplica su velocidad, la distancia de frenado se multiplica por:",
      opts: ["2", "3", "4"],
      correct: 2,
      exp: "Doble velocidad → 4x la distancia de frenado. La distancia de frenado aumenta más que proporcionalmente."
    },
    ru: {
      q: "Если ТС удваивает скорость, тормозной путь умножается на:",
      opts: ["2", "3", "4"],
      correct: 2,
      exp: "Удвоение скорости → 4x тормозной путь. Тормозной путь растёт быстрее пропорционально."
    }
  },
  {
    id: 39, tema: 3, page: 31, difficulty: 'medium',
    es: {
      q: "La distancia de detención es:",
      opts: ["Solo la distancia que recorre el vehículo durante el frenado", "La suma de la distancia de reacción y la distancia de frenado", "Sólo la distancia recorrida durante el tiempo de reacción"],
      correct: 1,
      exp: "Detención = reacción + frenado. Es el espacio total desde percibir el obstáculo hasta detenerse."
    },
    ru: {
      q: "Полный остановочный путь — это:",
      opts: ["Только расстояние, которое проходит ТС при торможении", "Сумма пути реакции и тормозного пути", "Только путь, пройденный за время реакции"],
      correct: 1,
      exp: "Detención = реакция + торможение. Полный путь от обнаружения препятствия до остановки."
    }
  },
  {
    id: 40, tema: 3, page: 32, difficulty: 'hard',
    es: {
      q: "¿Cuál es la separación mínima de seguridad requerida para un vehículo con MMA superior a 3.500 kg cuando se cumplen las condiciones que prohíben adelantar?",
      opts: ["20 metros", "50 metros", "100 metros"],
      correct: 1,
      exp: "Vehículo >3.500 kg o conjunto >10 m: separación mínima 50 metros cuando no puede adelantarse y necesita parar sin colisión."
    },
    ru: {
      q: "Каково минимальное безопасное расстояние для ТС с MMA свыше 3.500 кг, когда выполняются условия, запрещающие обгон?",
      opts: ["20 метров", "50 метров", "100 метров"],
      correct: 1,
      exp: "ТС >3.500 кг или состав >10 м: минимум 50 метров, когда обгон запрещён и нужно остановиться без столкновения."
    }
  },
  {
    id: 41, tema: 3, page: 32, difficulty: 'medium',
    es: {
      q: "La principal causa de los accidentes por alcance es:",
      opts: ["No mantener la distancia de seguridad con el vehículo de delante", "El exceso de velocidad", "El consumo de alcohol"],
      correct: 0,
      exp: "Accidentes por alcance (rear-end) = principal causa: NO guardar la distancia de seguridad."
    },
    ru: {
      q: "Главная причина аварий при наезде сзади:",
      opts: ["Несоблюдение дистанции безопасности с впереди идущим ТС", "Превышение скорости", "Употребление алкоголя"],
      correct: 0,
      exp: "Аварии-наезды сзади = главная причина: НЕ соблюдение дистанции безопасности."
    }
  },

  // ============ TEMA 4 — MANIOBRAS (pages 33-35) ============
  {
    id: 42, tema: 4, page: 33, difficulty: 'easy',
    es: {
      q: "¿Cuál es el orden correcto de los tres pasos de la regla de seguridad RSM antes de realizar una maniobra?",
      opts: ["Señal → Retrovisor → Maniobra", "Retrovisor → Señal → Maniobra", "Maniobra → Señal → Retrovisor"],
      correct: 1,
      exp: "RSM = Retrovisor (observar) → Señal (advertir) → Maniobra (realizar). En este orden, siempre."
    },
    ru: {
      q: "Каков правильный порядок трёх шагов правила безопасности RSM перед выполнением манёвра?",
      opts: ["Сигнал → Зеркало → Манёвр", "Зеркало → Сигнал → Манёвр", "Манёвр → Сигнал → Зеркало"],
      correct: 1,
      exp: "RSM = Зеркало (Retrovisor — наблюдать) → Сигнал (Señal — предупредить) → Манёвр (Maniobra). Всегда в этом порядке."
    }
  },
  {
    id: 43, tema: 4, page: 33, difficulty: 'medium',
    es: {
      q: "Las advertencias luminosas (intermitentes) deben permanecer encendidas:",
      opts: ["Sólo antes de iniciar la maniobra, terminando antes", "Hasta que finalice la maniobra", "Durante 30 segundos exactos"],
      correct: 1,
      exp: "Luminosas: hasta que finalice la maniobra. Las hechas con el brazo: terminan ANTES de iniciar la maniobra."
    },
    ru: {
      q: "Световые сигналы (поворотники) должны быть включены:",
      opts: ["Только до начала манёвра, заканчиваясь раньше", "До окончания манёвра", "Ровно 30 секунд"],
      correct: 1,
      exp: "Световые: до окончания манёвра. Сигналы рукой: заканчиваются ДО начала манёвра."
    }
  },
  {
    id: 44, tema: 4, page: 34, difficulty: 'hard',
    es: {
      q: "¿Cómo se realiza la señal con el brazo para indicar la intención de inmovilizar el vehículo o frenar considerablemente?",
      opts: ["Brazo extendido horizontalmente con la palma hacia atrás", "Brazo moviéndose alternativamente de arriba abajo con movimientos cortos y rápidos", "Brazo en posición horizontal con la palma extendida hacia abajo"],
      correct: 1,
      exp: "Frenar/inmovilizar: brazo de arriba a abajo con movimientos cortos y rápidos. Marcha atrás: brazo horizontal con palma atrás."
    },
    ru: {
      q: "Как подаётся сигнал рукой для обозначения намерения остановить ТС или значительно затормозить?",
      opts: ["Рука горизонтально, ладонь назад", "Рука движется попеременно вверх-вниз короткими быстрыми движениями", "Рука горизонтально, ладонь вниз"],
      correct: 1,
      exp: "Торможение/остановка: рука вверх-вниз короткими быстрыми движениями. Задний ход: рука горизонтально, ладонь назад."
    }
  },
  {
    id: 45, tema: 4, page: 34, difficulty: 'medium',
    es: {
      q: "La señalización de una maniobra:",
      opts: ["Otorga al conductor la prioridad para realizarla", "Sólo advierte la intención pero NO otorga ningún derecho", "Obliga a los demás vehículos a detenerse"],
      correct: 1,
      exp: "Señalizar SÓLO advierte intención. NO otorga derechos. Hay que asegurarse de que la maniobra es segura."
    },
    ru: {
      q: "Сигнализация манёвра:",
      opts: ["Даёт водителю приоритет на его выполнение", "Только предупреждает о намерении, но НЕ даёт никаких прав", "Обязывает другие ТС остановиться"],
      correct: 1,
      exp: "Сигнал ТОЛЬКО предупреждает о намерении. НЕ даёт прав. Нужно убедиться, что манёвр безопасен."
    }
  },
  {
    id: 46, tema: 4, page: 34, difficulty: 'medium',
    es: {
      q: "Un conductor que se incorpora a una vía utilizando un carril de aceleración debe asegurarse de que puede hacerlo sin peligro:",
      opts: ["Al final del carril de aceleración", "Al principio del carril de aceleración", "En cualquier punto del carril"],
      correct: 1,
      exp: "Carril de aceleración: comprobar al PRINCIPIO. Si hay que ceder, detenerse al inicio del carril, no al final."
    },
    ru: {
      q: "Водитель, въезжающий на дорогу через полосу разгона, должен убедиться, что может сделать это безопасно:",
      opts: ["В конце полосы разгона", "В начале полосы разгона", "В любой точке полосы"],
      correct: 1,
      exp: "Полоса разгона: проверять В НАЧАЛЕ. Если нужно уступить — остановиться в начале полосы, не в конце."
    }
  },
  {
    id: 47, tema: 4, page: 35, difficulty: 'medium',
    es: {
      q: "Dentro de poblado, los conductores tienen la obligación de facilitar la incorporación de:",
      opts: ["Cualquier vehículo que pretenda incorporarse", "Vehículos de transporte colectivo de viajeros desde una parada señalizada", "Sólo motocicletas"],
      correct: 1,
      exp: "Dentro de poblado: facilitar SOBRE TODO la incorporación de transporte colectivo (autobús) desde paradas señalizadas."
    },
    ru: {
      q: "В населённом пункте водители обязаны облегчать выезд:",
      opts: ["Любого ТС, желающего влиться в поток", "Общественного транспорта с обозначенной остановки", "Только мотоциклов"],
      correct: 1,
      exp: "В населённом пункте: облегчать ОСОБЕННО выезд общественного транспорта (автобуса) с обозначенных остановок."
    }
  },
  {
    id: 48, tema: 4, page: 35, difficulty: 'easy',
    es: {
      q: "El adelantamiento se define como:",
      opts: ["La maniobra de cambiar de carril por cualquier motivo", "Sobrepasar a uno o varios vehículos en movimiento que circulan a velocidad inferior, delante del que la realiza", "Adelantar a un vehículo estacionado"],
      correct: 1,
      exp: "Adelantamiento = sobrepasar vehículos EN MOVIMIENTO que circulan más despacio. No incluye vehículos parados."
    },
    ru: {
      q: "Обгон определяется как:",
      opts: ["Манёвр смены полосы по любой причине", "Опережение одного или нескольких ДВИЖУЩИХСЯ ТС, идущих с меньшей скоростью впереди", "Опережение припаркованного ТС"],
      correct: 1,
      exp: "Обгон = опережение ДВИЖУЩИХСЯ ТС, идущих медленнее. Не включает стоящие ТС."
    }
  },
  {
    id: 49, tema: 4, page: 35, difficulty: 'medium',
    es: {
      q: "Al iniciar un desplazamiento lateral (por ejemplo en un adelantamiento), el conductor debe:",
      opts: ["Hacerlo de forma brusca y rápida", "Iniciarlo a una distancia suficiente del obstáculo, hacerlo de forma progresiva y gradual sin estorbar a otros", "Sólo si los demás vehículos lo permiten"],
      correct: 1,
      exp: "Desplazamiento lateral: distancia suficiente + progresivo + gradual + sin estorbar. Si invade otro carril, respetar prioridad."
    },
    ru: {
      q: "При начале бокового перестроения (например, при обгоне) водитель должен:",
      opts: ["Делать это резко и быстро", "Начинать с достаточного расстояния от препятствия, выполнять постепенно и плавно, не мешая другим", "Только если другие ТС позволяют"],
      correct: 1,
      exp: "Боковое перестроение: достаточное расстояние + постепенно + плавно + не мешая. При выезде на другую полосу — уступать приоритет."
    }
  },
  {
    id: 50, tema: 4, page: 35, difficulty: 'medium',
    es: {
      q: "Si un conductor sale a una vía pública por un camino exclusivamente privado, debe:",
      opts: ["Hacerlo a velocidad normal", "Hacerlo a una velocidad que le permita detenerse en el acto y ceder el paso a los vehículos que circulen", "Tiene prioridad sobre los demás"],
      correct: 1,
      exp: "Salir de camino privado: velocidad para detenerse en el acto + ceder el paso. NO hay prioridad."
    },
    ru: {
      q: "Если водитель выезжает на общественную дорогу с частной дороги, он должен:",
      opts: ["Делать это с обычной скоростью", "Делать это со скоростью, позволяющей мгновенно остановиться, и уступать дорогу едущим ТС", "Имеет приоритет перед другими"],
      correct: 1,
      exp: "Выезд с частной дороги: скорость для мгновенной остановки + уступать дорогу. НЕТ приоритета."
    }
  },
];

// ============================================================================
// HELPERS
// ============================================================================
const TEMA_INFO = {
  1: { name: 'Tanımlar', es: 'Definiciones', ru: 'Определения', color: '#FCD34D', range: '11' },
  2: { name: 'Yol Kullanımı', es: 'Utilización de la Vía', ru: 'Использование дороги', color: '#60A5FA', range: '12-24' },
  3: { name: 'Hız ve Mesafeler', es: 'Velocidad y Distancias', ru: 'Скорость и расстояния', color: '#F87171', range: '25-32' },
  4: { name: 'Manevralar', es: 'Maniobras', ru: 'Манёвры', color: '#34D399', range: '33-35' },
};

const shuffle = (a) => {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
// ============================================================================
// MAIN COMPONENT
// ============================================================================
const C = {
  bg: '#0a1628',
  bgDeep: '#050b18',
  bgMid: '#142a4f',
  card: 'rgba(15, 31, 61, 0.85)',
  cardSolid: '#0f1f3d',
  cardLight: 'rgba(23, 42, 74, 0.85)',
  border: '#1e3a5f',
  borderSoft: 'rgba(30, 58, 95, 0.5)',
  amber: '#fbbf24',
  amberLight: '#fcd34d',
  amberDark: '#f59e0b',
  amberDeep: '#b45309',
  cream: '#fef3c7',
  textBody: '#e2e8f0',
  textMuted: '#cbd5e1',
  textSubtle: '#94a3b8',
  textFaint: '#64748b',
  success: '#34d399',
  successDark: '#10b981',
  successLight: '#a7f3d0',
  error: '#f87171',
  errorDark: '#ef4444',
  errorLight: '#fecaca',
  cyan: '#67e8f9',
  feverGlow: 'rgba(252, 211, 77, 0.4)',
};

const ARCADE_TIME = 20; // seconds per question
const FEVER_THRESHOLD = 5;

export default function App() {
  const [screen, setScreen] = useState('home');
  const [topicFilter, setTopicFilter] = useState('all');
  const [mode, setMode] = useState('practice');
  const [quiz, setQuiz] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [wrongIds, setWrongIds] = useState([]);
  const [reviewMode, setReviewMode] = useState(false);
  const [history, setHistory] = useState({ played: 0, correctTotal: 0 });

  // Arcade-specific
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [arcScore, setArcScore] = useState(0);
  const [bestArcScore, setBestArcScore] = useState(0);
  const [newBest, setNewBest] = useState(false);
  const [timeLeft, setTimeLeft] = useState(ARCADE_TIME);
  const [pointsAnim, setPointsAnim] = useState(null);

  const currentQ = quiz[qIdx];
  const isArcade = mode === 'arcade';
  const multiplier = combo >= FEVER_THRESHOLD ? 3 : combo >= 2 ? 2 : 1;
  const fever = combo >= FEVER_THRESHOLD;

  // Reset timer on new question
  useEffect(() => {
    if (isArcade && screen === 'quiz' && !showFeedback) {
      setTimeLeft(ARCADE_TIME);
    }
  }, [qIdx, isArcade, screen, showFeedback]);

  // Tick timer
  useEffect(() => {
    if (!isArcade || screen !== 'quiz' || showFeedback) return;
    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }
    const t = setTimeout(() => setTimeLeft(v => Math.max(0, v - 0.1)), 100);
    return () => clearTimeout(t);
  }, [timeLeft, isArcade, screen, showFeedback]);

  const startQuiz = (chosenMode, filterOverride = null, reviewQs = null) => {
    let pool;
    if (reviewQs) {
      pool = reviewQs;
    } else {
      const filter = filterOverride !== null ? filterOverride : topicFilter;
      pool = filter === 'all'
        ? QUESTIONS
        : QUESTIONS.filter(q => q.tema === parseInt(filter));
    }
    let qs = shuffle(pool);
    if (chosenMode === 'exam') qs = qs.slice(0, Math.min(30, qs.length));
    else if (chosenMode === 'quick') qs = qs.slice(0, Math.min(10, qs.length));
    // arcade uses all questions

    setMode(chosenMode);
    setQuiz(qs);
    setQIdx(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setLives(chosenMode === 'exam' || chosenMode === 'arcade' ? 3 : 999);
    setSelected(null);
    setShowFeedback(false);
    setWrongIds([]);
    setReviewMode(!!reviewQs);
    setCombo(0);
    setMaxCombo(0);
    setArcScore(0);
    setNewBest(false);
    setTimeLeft(ARCADE_TIME);
    setPointsAnim(null);
    setScreen('quiz');
  };

  const answerQuestion = (idx) => {
    if (showFeedback) return;
    setSelected(idx);
    setShowFeedback(true);
    const correctIdx = currentQ.es.correct;
    const isCorrectAnswer = idx === correctIdx;

    if (isCorrectAnswer) {
      setScore(s => s + 1);
      setStreak(s => {
        const ns = s + 1;
        setBestStreak(b => Math.max(b, ns));
        return ns;
      });

      if (isArcade) {
        const newCombo = combo + 1;
        setCombo(newCombo);
        setMaxCombo(m => Math.max(m, newCombo));
        const mult = newCombo >= FEVER_THRESHOLD ? 3 : newCombo >= 2 ? 2 : 1;
        const tBonus = Math.floor(timeLeft) * 10;
        const pts = (100 + tBonus) * mult;
        setArcScore(s => s + pts);
        setPointsAnim({ pts, mult, key: Date.now() });
        setTimeout(() => setPointsAnim(null), 1400);
      }
    } else {
      setStreak(0);
      setLives(l => l - 1);
      setWrongIds(w => [...w, currentQ.id]);
      if (isArcade) setCombo(0);
    }
  };

  const handleTimeout = () => {
    if (showFeedback) return;
    setSelected(-1);
    setShowFeedback(true);
    setStreak(0);
    setCombo(0);
    setLives(l => l - 1);
    setWrongIds(w => [...w, currentQ.id]);
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowFeedback(false);
    const willEnd = lives <= 0 || qIdx + 1 >= quiz.length;
    if (willEnd) {
      if (isArcade && arcScore > bestArcScore) {
        setBestArcScore(arcScore);
        setNewBest(true);
      }
      setHistory(h => ({
        played: h.played + 1,
        correctTotal: h.correctTotal + score,
      }));
      setScreen('results');
    } else {
      setQIdx(q => q + 1);
    }
  };

  const exitQuiz = () => {
    setScreen('home');
    setSelected(null);
    setShowFeedback(false);
  };

  const wrapperStyle = {
    minHeight: '100vh',
    width: '100%',
    overflowX: 'hidden',
    background: fever && screen === 'quiz'
      ? `radial-gradient(ellipse at top, #4a2f0f 0%, #2a1c08 50%, ${C.bgDeep} 100%)`
      : `radial-gradient(ellipse at top, ${C.bgMid} 0%, ${C.bg} 50%, ${C.bgDeep} 100%)`,
    fontFamily: "'DM Sans', system-ui, sans-serif",
    color: C.textBody,
    transition: 'background 0.5s ease',
  };

  // ============================================================
  // HOME
  // ============================================================
  if (screen === 'home') {
    const filteredCount = topicFilter === 'all'
      ? QUESTIONS.length
      : QUESTIONS.filter(q => q.tema === parseInt(topicFilter)).length;

    return (
      <div style={wrapperStyle}>
        <FontImports />
        <GridBg />

        <div className="relative z-10 max-w-2xl mx-auto px-5 py-8 md:py-12">

          {/* HEADER */}
          <header className="mb-8 md:mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${C.amberLight}, ${C.amberDark})`, boxShadow: `0 8px 24px ${C.amberLight}33` }}>
                <span className="text-2xl font-black" style={{ color: C.bg }}>B</span>
              </div>
              <div>
                <div className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: C.amberLight }}>DGT · Permiso B</div>
                <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>Hoy-Voy · Páginas 11–35</div>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-[0.9] tracking-tight" style={{
              fontFamily: "'Bebas Neue', 'Anton', Impact, sans-serif",
              color: C.cream,
              letterSpacing: '0.02em',
            }}>
              ESTUDIA <span style={{ color: C.amberLight }}>Y</span><br />
              APRUEBA.
            </h1>
            <p className="text-sm mt-3 leading-relaxed max-w-md" style={{ color: C.textBody }}>
              {QUESTIONS.length} preguntas · Español + Ruso · referencia a la página del libro.<br />
              Si fallas, te indico la página exacta para repasarla.
            </p>
          </header>

          {/* HISTORY STATS */}
          {(history.played > 0 || bestArcScore > 0) && (
            <div className="mb-6 grid grid-cols-3 gap-2">
              {history.played > 0 && (
                <div className="px-3 py-3 rounded-lg border" style={{ borderColor: C.border, background: C.card }}>
                  <div className="text-xs uppercase tracking-wider mb-1 font-semibold" style={{ color: C.textMuted }}>Partidas</div>
                  <div className="font-bold text-lg" style={{ color: C.amberLight }}>{history.played}</div>
                </div>
              )}
              {history.played > 0 && (
                <div className="px-3 py-3 rounded-lg border" style={{ borderColor: C.border, background: C.card }}>
                  <div className="text-xs uppercase tracking-wider mb-1 font-semibold" style={{ color: C.textMuted }}>Aciertos</div>
                  <div className="font-bold text-lg" style={{ color: C.success }}>{history.correctTotal}</div>
                </div>
              )}
              {bestArcScore > 0 && (
                <div className="px-3 py-3 rounded-lg border" style={{ borderColor: C.amberLight + '66', background: C.amberLight + '14' }}>
                  <div className="text-xs uppercase tracking-wider mb-1 font-semibold flex items-center gap-1" style={{ color: C.amberLight }}>
                    <Trophy size={11} /> Mejor
                  </div>
                  <div className="font-black text-lg" style={{ color: C.amberLight, fontFamily: "'Bebas Neue', sans-serif" }}>
                    {bestArcScore.toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TOPIC FILTER */}
          <div className="mb-6">
            <div className="text-xs uppercase tracking-[0.2em] font-bold mb-2 flex items-center gap-1" style={{ color: C.amberLight }}>
              <Filter size={11} /> Tema · {filteredCount} preguntas
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {[
                { v: 'all', label: 'TODOS', tColor: C.amberLight },
                { v: '1', label: 'T1', tColor: TEMA_INFO[1].color },
                { v: '2', label: 'T2', tColor: TEMA_INFO[2].color },
                { v: '3', label: 'T3', tColor: TEMA_INFO[3].color },
                { v: '4', label: 'T4', tColor: TEMA_INFO[4].color },
              ].map(t => {
                const active = topicFilter === t.v;
                return (
                  <button
                    key={t.v}
                    onClick={() => setTopicFilter(t.v)}
                    className="px-2 py-2.5 rounded-lg border-2 text-xs font-bold transition-all"
                    style={{
                      borderColor: active ? t.tColor : C.border,
                      background: active ? `${t.tColor}1a` : C.card,
                      color: active ? t.tColor : C.textBody,
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
            <div className="text-xs mt-2 leading-relaxed" style={{ color: C.textMuted }}>
              T1: Definiciones (p.11) · T2: Vía (p.12-24) · T3: Velocidad (p.25-32) · T4: Maniobras (p.33-35)
            </div>
          </div>

          {/* MODES */}
          <div className="space-y-2.5 mb-4">
            <ModeButton
              icon={<Zap size={20} />}
              title="ARCADE"
              subtitle="Combo · Fever · Récord"
              desc="20s por pregunta · combo x3 en Fever Mode · cuanto más rápido, más puntos"
              accent={C.amberLight}
              special
              badge={bestArcScore > 0 ? `Récord: ${bestArcScore.toLocaleString()}` : null}
              onClick={() => startQuiz('arcade')}
            />
            <ModeButton
              icon={<Target size={20} />}
              title="PRÁCTICA"
              subtitle="Modo aprender"
              desc="Vidas infinitas · todas las preguntas · sin presión"
              accent={C.success}
              onClick={() => startQuiz('practice')}
            />
            <ModeButton
              icon={<Award size={20} />}
              title="EXAMEN"
              subtitle="Simulación DGT"
              desc="30 preguntas · 3 vidas · igual que el examen real"
              accent={C.error}
              onClick={() => startQuiz('exam')}
            />
            <ModeButton
              icon={<Flame size={20} />}
              title="RÁPIDO"
              subtitle="Calentamiento"
              desc="10 preguntas · ronda corta para empezar"
              accent={C.cyan}
              onClick={() => startQuiz('quick')}
            />
          </div>

          {/* REVIEW WRONG */}
          {wrongIds.length > 0 && (
            <button
              onClick={() => {
                const reviewQs = QUESTIONS.filter(q => wrongIds.includes(q.id));
                startQuiz('practice', null, reviewQs);
              }}
              className="w-full px-4 py-3 rounded-lg border-2 text-sm font-bold flex items-center justify-center gap-2 transition-all"
              style={{
                borderColor: `${C.error}66`,
                background: `${C.error}10`,
                color: C.error,
              }}
            >
              <RefreshCw size={15} />
              REPASAR {wrongIds.length} ERRORES
            </button>
          )}

          {/* FOOTER */}
          <footer className="mt-10 pt-6 border-t text-sm text-center" style={{ borderColor: C.borderSoft, color: C.textMuted }}>
            ¡Mucha suerte! · Удачи! 🍀
          </footer>
        </div>
      </div>
    );
  }

  // ============================================================
  // QUIZ
  // ============================================================
  if (screen === 'quiz' && currentQ) {
    const correctIdx = currentQ.es.correct;
    const isCorrect = selected === correctIdx;
    const tInfo = TEMA_INFO[currentQ.tema];
    const timerColor = timeLeft > 10 ? C.success : timeLeft > 5 ? C.amberLight : C.error;
    const timerPct = (timeLeft / ARCADE_TIME) * 100;
    const isLatestTimeout = selected === -1;

    return (
      <div style={wrapperStyle}>
        <FontImports />
        <GridBg />

        {/* FEVER overlay */}
        {fever && (
          <div className="fixed inset-0 pointer-events-none z-0" style={{
            boxShadow: `inset 0 0 200px ${C.feverGlow}`,
            animation: 'feverPulse 1.5s ease-in-out infinite',
          }} />
        )}

        <div className="relative z-10 max-w-2xl mx-auto px-5 py-5">

          {/* TOP BAR */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={exitQuiz}
              className="w-9 h-9 rounded-lg border flex items-center justify-center transition-all"
              style={{ borderColor: C.border, background: C.card, color: C.textBody }}
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2">
              {(mode === 'exam' || isArcade) && (
                <div className="flex gap-1 mr-1">
                  {[...Array(3)].map((_, i) => (
                    <Heart
                      key={i}
                      size={16}
                      fill={i < lives ? C.error : 'transparent'}
                      stroke={i < lives ? C.error : C.textFaint}
                      strokeWidth={2}
                    />
                  ))}
                </div>
              )}

              {isArcade ? (
                <>
                  {/* Combo Badge */}
                  <div className="px-2.5 py-1 rounded-md border-2 flex items-center gap-1.5 transition-all"
                    style={{
                      borderColor: fever ? C.amberLight : combo >= 2 ? C.amberLight + '99' : C.border,
                      background: fever ? C.amberLight + '26' : C.card,
                      transform: combo > 0 ? 'scale(1.0)' : 'scale(0.95)',
                    }}>
                    <Flame size={13}
                      fill={combo > 0 ? C.amberLight : 'transparent'}
                      stroke={combo > 0 ? C.amberLight : C.textFaint} />
                    <span className="text-xs font-black" style={{ color: combo > 0 ? C.amberLight : C.textSubtle }}>
                      {combo}
                    </span>
                    <span className="text-[10px] font-bold ml-0.5 px-1 rounded" style={{
                      color: C.bg,
                      background: fever ? C.amberLight : combo >= 2 ? C.amberLight : C.textFaint,
                    }}>
                      ×{multiplier}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="px-2.5 py-1 rounded-md border-2 flex items-center gap-1.5 relative"
                    style={{ borderColor: C.success + '66', background: C.success + '14' }}>
                    <Trophy size={13} style={{ color: C.success }} />
                    <span className="text-xs font-black" style={{ color: C.success, fontFamily: "'Bebas Neue', sans-serif", fontSize: '15px', letterSpacing: '0.05em' }}>
                      {arcScore.toLocaleString()}
                    </span>

                    {/* Floating points */}
                    {pointsAnim && (
                      <div
                        key={pointsAnim.key}
                        className="absolute -top-2 right-0 font-black text-base whitespace-nowrap pointer-events-none"
                        style={{
                          color: pointsAnim.mult === 3 ? C.amberLight : pointsAnim.mult === 2 ? C.success : C.cream,
                          fontFamily: "'Bebas Neue', sans-serif",
                          textShadow: `0 0 12px ${pointsAnim.mult === 3 ? C.amberLight : C.success}`,
                          animation: 'floatPoints 1.4s ease-out forwards',
                        }}
                      >
                        +{pointsAnim.pts.toLocaleString()}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="px-2.5 py-1 rounded-md border flex items-center gap-1.5"
                    style={{ borderColor: C.border, background: C.card }}>
                    <Flame size={13} style={{ color: streak > 0 ? C.amberLight : C.textFaint }} fill={streak > 0 ? C.amberLight : 'transparent'} />
                    <span className="text-xs font-bold" style={{ color: streak > 0 ? C.amberLight : C.textSubtle }}>{streak}</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-md border flex items-center gap-1.5"
                    style={{ borderColor: C.border, background: C.card }}>
                    <Trophy size={13} style={{ color: C.success }} />
                    <span className="text-xs font-bold" style={{ color: C.success }}>{score}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* PROGRESS / TIMER */}
          {isArcade ? (
            <div className="mb-5">
              <div className="flex justify-between text-xs mb-1.5 uppercase tracking-wider font-semibold">
                <span style={{ color: C.textBody }}>{qIdx + 1} / {quiz.length}</span>
                <span style={{ color: timerColor, fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', letterSpacing: '0.1em' }}>
                  {timeLeft.toFixed(1)}s
                </span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: C.borderSoft }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${timerPct}%`,
                    background: timerColor,
                    transition: 'width 100ms linear, background-color 200ms',
                    boxShadow: timeLeft <= 5 ? `0 0 12px ${C.error}` : 'none',
                  }}
                />
              </div>
              {fever && (
                <div className="text-center mt-2 text-xs font-black uppercase tracking-[0.3em]" style={{
                  color: C.amberLight,
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '14px',
                  textShadow: `0 0 12px ${C.amberLight}`,
                  animation: 'fadeIn 0.3s',
                }}>
                  ⚡ FEVER MODE ⚡
                </div>
              )}
            </div>
          ) : (
            <div className="mb-5">
              <div className="flex justify-between text-xs mb-1.5 uppercase tracking-wider font-semibold" style={{ color: C.textBody }}>
                <span>{qIdx + 1} / {quiz.length}</span>
                <span style={{ color: C.amberLight }}>
                  {reviewMode ? 'Repaso de errores' : mode === 'exam' ? 'Examen' : mode === 'quick' ? 'Rápido' : 'Práctica'}
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.borderSoft }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${((qIdx + (showFeedback ? 1 : 0)) / quiz.length) * 100}%`,
                    background: `linear-gradient(90deg, ${C.amberLight}, ${C.amberDark})`,
                  }}
                />
              </div>
            </div>
          )}

          {/* CARD */}
          <div className="rounded-2xl border-2 overflow-hidden" style={{
            background: `linear-gradient(180deg, ${C.cardLight} 0%, ${C.card} 100%)`,
            borderColor: fever ? C.amberLight + '99' : C.border,
            backdropFilter: 'blur(8px)',
            boxShadow: fever ? `0 0 40px ${C.feverGlow}` : 'none',
            animation: showFeedback && !isCorrect && !isLatestTimeout ? 'cardShake 0.4s' : 'none',
            transition: 'border-color 0.3s, box-shadow 0.3s',
          }}>
            {/* Tema badge */}
            <div className="px-5 pt-5 pb-3 border-b flex items-center justify-between" style={{ borderColor: C.borderSoft }}>
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 rounded-full" style={{ background: tInfo.color }} />
                <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: tInfo.color }}>
                  Tema {currentQ.tema} · {tInfo.es}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs uppercase font-semibold" style={{ color: C.amberLight }}>
                <BookOpen size={11} /> P. {currentQ.page}
              </div>
            </div>

            {/* Questions */}
            <div className="p-5">
              <div className="mb-3">
                <div className="text-xs uppercase tracking-wider font-bold mb-1.5" style={{ color: C.amberLight }}>🇪🇸 Español</div>
                <p className="text-base md:text-lg leading-snug font-semibold" style={{ color: C.cream }}>
                  {currentQ.es.q}
                </p>
              </div>
              <div className="pt-3 border-t" style={{ borderColor: C.borderSoft }}>
                <div className="text-xs uppercase tracking-wider font-bold mb-1.5" style={{ color: C.cyan }}>🇷🇺 Русский</div>
                <p className="text-sm md:text-base leading-snug font-medium" style={{ color: C.textBody }}>
                  {currentQ.ru.q}
                </p>
              </div>
            </div>

            {/* Options */}
            <div className="px-5 pb-5 space-y-2">
              {currentQ.es.opts.map((_, i) => {
                const isSelected = selected === i;
                const isCorrectOpt = i === correctIdx;
                const showResult = showFeedback;

                let optBorder = C.border;
                let optBg = `${C.bg}99`;
                let optText = C.textBody;
                let badgeBorder = C.border;
                let badgeBg = C.cardSolid;
                let badgeText = C.amberLight;

                if (showResult) {
                  if (isCorrectOpt) {
                    optBorder = C.success;
                    optBg = `${C.success}26`;
                    optText = C.successLight;
                    badgeBorder = C.success;
                    badgeBg = `${C.success}33`;
                    badgeText = C.successLight;
                  } else if (isSelected) {
                    optBorder = C.error;
                    optBg = `${C.error}26`;
                    optText = C.errorLight;
                    badgeBorder = C.error;
                    badgeBg = `${C.error}33`;
                    badgeText = C.errorLight;
                  } else {
                    optBorder = C.borderSoft;
                    optBg = `${C.bg}66`;
                    optText = C.textSubtle;
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => answerQuestion(i)}
                    disabled={showFeedback}
                    className="w-full text-left px-4 py-3 rounded-xl border-2 transition-all"
                    style={{
                      background: optBg,
                      borderColor: optBorder,
                      color: optText,
                      cursor: showFeedback ? 'default' : 'pointer',
                    }}
                    onMouseEnter={e => {
                      if (!showResult) e.currentTarget.style.borderColor = C.amberLight;
                    }}
                    onMouseLeave={e => {
                      if (!showResult) e.currentTarget.style.borderColor = C.border;
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center font-bold text-sm border-2"
                        style={{ borderColor: badgeBorder, background: badgeBg, color: badgeText }}>
                        {showResult && isCorrectOpt ? <Check size={14} /> :
                         showResult && isSelected ? <X size={14} /> :
                         String.fromCharCode(65 + i)}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm leading-snug font-medium" style={{ color: optText }}>
                          {currentQ.es.opts[i]}
                        </div>
                        <div className="text-xs leading-snug mt-1.5 pt-1.5 border-t" style={{
                          borderColor: `${optText}33`,
                          color: optText,
                          opacity: 0.85,
                        }}>
                          {currentQ.ru.opts[i]}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* FEEDBACK */}
            {showFeedback && (
              <div className="border-t p-5" style={{
                borderColor: C.borderSoft,
                background: isCorrect ? `${C.success}0a` : `${C.error}0a`,
                animation: 'fadeIn 0.3s ease-out',
              }}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center border-2"
                    style={{
                      background: isCorrect ? `${C.success}33` : `${C.error}33`,
                      borderColor: isCorrect ? `${C.success}66` : `${C.error}66`,
                      color: isCorrect ? C.successLight : C.errorLight,
                    }}>
                    {isCorrect ? <Check size={18} /> : <X size={18} />}
                  </div>
                  <div className="flex-1">
                    <div className="text-base font-bold mb-0.5" style={{ color: isCorrect ? C.successLight : C.errorLight }}>
                      {isCorrect ? '¡Correcto!' : isLatestTimeout ? '¡Tiempo agotado!' : 'Incorrecto'}
                    </div>
                    {!isCorrect && (
                      <div className="text-sm" style={{ color: C.textBody }}>
                        Respuesta correcta: <span className="font-bold" style={{ color: C.amberLight }}>{String.fromCharCode(65 + correctIdx)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Explanations */}
                <div className="space-y-3">
                  <div>
                    <div className="text-xs uppercase tracking-wider font-bold mb-1" style={{ color: C.amberLight }}>🇪🇸 Explicación</div>
                    <div className="text-sm leading-relaxed" style={{ color: C.cream }}>{currentQ.es.exp}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider font-bold mb-1" style={{ color: C.cyan }}>🇷🇺 Объяснение</div>
                    <div className="text-sm leading-relaxed" style={{ color: C.textBody }}>{currentQ.ru.exp}</div>
                  </div>
                </div>

                {/* Page reference */}
                <div className="mt-4 p-3 rounded-xl border-2" style={{
                  borderColor: isCorrect ? C.border : `${C.amberLight}66`,
                  background: isCorrect ? C.card : `${C.amberLight}14`,
                }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: isCorrect ? C.cardSolid : `${C.amberLight}33`,
                        border: isCorrect ? `1px solid ${C.border}` : `1px solid ${C.amberLight}66`,
                      }}>
                      <BookOpen size={18} style={{ color: isCorrect ? C.textBody : C.amberLight }} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-wider font-bold" style={{
                        color: isCorrect ? C.textMuted : C.amberLight,
                      }}>
                        {isCorrect ? 'Para más detalle' : '⚠ Vuelve al libro y repasa'}
                      </div>
                      <div className="text-base font-bold" style={{ color: isCorrect ? C.cream : '#fde68a' }}>
                        Hoy-Voy · Página {currentQ.page}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={nextQuestion}
                  className="w-full mt-4 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: isCorrect
                      ? `linear-gradient(90deg, ${C.success}, ${C.successDark})`
                      : `linear-gradient(90deg, ${C.amberLight}, ${C.amberDark})`,
                    color: C.bg,
                    boxShadow: isCorrect
                      ? `0 8px 20px ${C.success}40`
                      : `0 8px 20px ${C.amberLight}40`,
                  }}
                >
                  {qIdx + 1 >= quiz.length || ((mode === 'exam' || isArcade) && lives <= 0) ? 'Ver resultados' : 'Siguiente'}
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // RESULTS
  // ============================================================
  if (screen === 'results') {
    const total = quiz.length;
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    const passed = mode === 'exam' ? (score >= total - 3 && lives > 0) : pct >= 70;

    let title, msg, emoji, color;

    if (isArcade) {
      if (newBest) {
        title = '¡NUEVO RÉCORD!'; msg = '¡Has superado tu mejor puntuación!'; emoji = '🏆'; color = C.amberLight;
      } else if (arcScore >= 30000) {
        title = '¡INCREÍBLE!'; msg = 'Puntuación excelente'; emoji = '🔥'; color = C.amberLight;
      } else if (arcScore >= 15000) {
        title = '¡Buena partida!'; msg = 'Sigue así, vas mejorando'; emoji = '⚡'; color = C.success;
      } else {
        title = 'Game over'; msg = 'Inténtalo de nuevo y rompe tu récord'; emoji = '💪'; color = C.cyan;
      }
    } else if (mode === 'exam') {
      if (passed) { title = '¡APROBADO!'; msg = 'Estás listo para el examen'; emoji = '🎉'; color = C.success; }
      else { title = 'No aprobado'; msg = 'Inténtalo de nuevo, repasa los errores'; emoji = '💪'; color = C.error; }
    } else {
      if (pct >= 90) { title = '¡Excelente!'; msg = 'Rendimiento perfecto'; emoji = '🏆'; color = C.amberLight; }
      else if (pct >= 70) { title = '¡Muy bien!'; msg = 'Vas por buen camino'; emoji = '👍'; color = C.success; }
      else if (pct >= 50) { title = 'Sigue así'; msg = 'Necesitas más práctica'; emoji = '📚'; color = C.cyan; }
      else { title = 'A repasar'; msg = 'Revisa las páginas falladas'; emoji = '🎯'; color = C.error; }
    }

    const wrongByTema = {};
    wrongIds.forEach(id => {
      const q = QUESTIONS.find(qq => qq.id === id);
      if (!q) return;
      if (!wrongByTema[q.tema]) wrongByTema[q.tema] = [];
      wrongByTema[q.tema].push(q);
    });

    return (
      <div style={wrapperStyle}>
        <FontImports />
        <GridBg />

        <div className="relative z-10 max-w-2xl mx-auto px-5 py-8">
          {/* HERO */}
          <div className="text-center mb-8">
            <div className="text-7xl mb-3">{emoji}</div>
            <div className="text-xs uppercase tracking-[0.3em] font-bold mb-1" style={{ color }}>
              {isArcade ? 'Modo Arcade' : mode === 'exam' ? 'Modo Examen' : mode === 'quick' ? 'Modo Rápido' : 'Práctica'}
            </div>
            <h2 className="text-5xl font-black tracking-tight mb-2" style={{
              fontFamily: "'Bebas Neue', 'Anton', Impact, sans-serif",
              color,
              letterSpacing: '0.02em',
              textShadow: newBest ? `0 0 30px ${color}` : 'none',
            }}>
              {title}
            </h2>
            <p className="text-base" style={{ color: C.cream }}>{msg}</p>
          </div>

          {/* STATS */}
          {isArcade ? (
            <>
              {/* Big arcade score */}
              <div className="rounded-2xl border-2 p-6 mb-4 text-center relative overflow-hidden" style={{
                borderColor: color,
                background: `linear-gradient(135deg, ${color}1a 0%, ${C.card} 100%)`,
              }}>
                <div className="text-xs uppercase tracking-[0.3em] font-bold mb-2" style={{ color }}>
                  Puntuación final
                </div>
                <div className="text-7xl font-black tracking-tight" style={{
                  color,
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: '0.02em',
                  textShadow: `0 0 24px ${color}66`,
                }}>
                  {arcScore.toLocaleString()}
                </div>
                {bestArcScore > 0 && !newBest && (
                  <div className="text-sm mt-3" style={{ color: C.textMuted }}>
                    Récord: <span className="font-bold" style={{ color: C.amberLight }}>{bestArcScore.toLocaleString()}</span>
                    {arcScore < bestArcScore && (
                      <span className="ml-2" style={{ color: C.textSubtle }}>
                        (te faltan {(bestArcScore - arcScore).toLocaleString()})
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="rounded-xl border-2 p-4 text-center" style={{ borderColor: C.amberLight + '66', background: C.amberLight + '14' }}>
                  <div className="text-xs uppercase tracking-wider font-bold mb-1" style={{ color: C.amberLight }}>Combo máx</div>
                  <div className="text-3xl font-black inline-flex items-center gap-1" style={{ color: C.amberLight, fontFamily: "'Bebas Neue', sans-serif" }}>
                    <Flame size={20} fill={C.amberLight} stroke={C.amberLight} />×{maxCombo}
                  </div>
                </div>
                <div className="rounded-xl border-2 p-4 text-center" style={{ borderColor: C.border, background: C.card }}>
                  <div className="text-xs uppercase tracking-wider font-bold mb-1" style={{ color: C.textBody }}>Aciertos</div>
                  <div className="text-3xl font-black" style={{ color: C.success, fontFamily: "'Bebas Neue', sans-serif" }}>{score}</div>
                  <div className="text-xs mt-1" style={{ color: C.textMuted }}>/ {qIdx + 1}</div>
                </div>
                <div className="rounded-xl border-2 p-4 text-center" style={{ borderColor: C.border, background: C.card }}>
                  <div className="text-xs uppercase tracking-wider font-bold mb-1" style={{ color: C.textBody }}>Precisión</div>
                  <div className="text-3xl font-black" style={{ color: C.cyan, fontFamily: "'Bebas Neue', sans-serif" }}>
                    {qIdx > 0 ? Math.round((score / (qIdx + 1)) * 100) : 0}%
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="rounded-xl border-2 p-4 text-center" style={{ borderColor: C.border, background: C.card }}>
                <div className="text-xs uppercase tracking-wider font-bold mb-1" style={{ color: C.textBody }}>Aciertos</div>
                <div className="text-3xl font-black" style={{ color: C.success, fontFamily: "'Bebas Neue', sans-serif" }}>{score}</div>
                <div className="text-xs mt-1" style={{ color: C.textMuted }}>/ {total}</div>
              </div>
              <div className="rounded-xl border-2 p-4 text-center" style={{ borderColor: color, background: `${color}1a` }}>
                <div className="text-xs uppercase tracking-wider font-bold mb-1" style={{ color }}>Porcentaje</div>
                <div className="text-3xl font-black" style={{ color, fontFamily: "'Bebas Neue', sans-serif" }}>{pct}%</div>
                <div className="text-xs mt-1" style={{ color: `${color}cc` }}>éxito</div>
              </div>
              <div className="rounded-xl border-2 p-4 text-center" style={{ borderColor: C.border, background: C.card }}>
                <div className="text-xs uppercase tracking-wider font-bold mb-1" style={{ color: C.textBody }}>Mejor racha</div>
                <div className="text-3xl font-black inline-flex items-center gap-1" style={{ color: C.amberLight, fontFamily: "'Bebas Neue', sans-serif" }}>
                  <Flame size={20} fill={C.amberLight} stroke={C.amberLight} />{bestStreak}
                </div>
              </div>
            </div>
          )}

          {/* PAGES TO REVIEW */}
          {wrongIds.length > 0 && (
            <div className="mb-8 rounded-2xl border-2 overflow-hidden" style={{
              borderColor: `${C.amberLight}4d`,
              background: `${C.amberLight}0a`,
            }}>
              <div className="px-5 py-4 border-b flex items-center gap-2" style={{ borderColor: `${C.amberLight}33` }}>
                <BookOpen size={16} style={{ color: C.amberLight }} />
                <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#fde68a' }}>
                  Páginas para repasar
                </h3>
              </div>
              <div className="p-3 space-y-3">
                {Object.keys(wrongByTema).sort().map(t => (
                  <div key={t}>
                    <div className="text-xs uppercase tracking-wider font-bold mb-1.5 px-2" style={{ color: TEMA_INFO[t].color }}>
                      Tema {t} · {TEMA_INFO[t].es}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[...new Set(wrongByTema[t].map(q => q.page))].sort((a, b) => a - b).map(p => (
                        <div
                          key={p}
                          className="px-3 py-1.5 rounded-lg border-2 text-sm font-bold flex items-center gap-1.5"
                          style={{
                            borderColor: `${C.amberLight}66`,
                            background: `${C.amberLight}1a`,
                            color: '#fde68a',
                          }}
                        >
                          <BookOpen size={11} /> Pág. {p}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACTIONS */}
          <div className="space-y-2.5">
            {wrongIds.length > 0 && (
              <button
                onClick={() => {
                  const reviewQs = QUESTIONS.filter(q => wrongIds.includes(q.id));
                  startQuiz('practice', null, reviewQs);
                }}
                className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(90deg, ${C.amberLight}, ${C.amberDark})`,
                  color: C.bg,
                  boxShadow: `0 8px 20px ${C.amberLight}40`,
                }}
              >
                <RefreshCw size={15} />
                REPASAR {wrongIds.length} ERRORES
              </button>
            )}
            <button
              onClick={() => startQuiz(mode)}
              className="w-full py-3.5 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2"
              style={{ borderColor: C.border, background: C.card, color: C.amberLight }}
            >
              <Play size={15} /> Nueva ronda ({isArcade ? 'Arcade' : mode === 'exam' ? 'Examen' : mode === 'quick' ? 'Rápido' : 'Práctica'})
            </button>
            <button
              onClick={() => setScreen('home')}
              className="w-full py-3.5 rounded-xl border font-medium text-sm flex items-center justify-center gap-2"
              style={{ borderColor: C.borderSoft, background: 'transparent', color: C.textMuted }}
            >
              <Home size={15} /> Menú principal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// ============================================================================
// SUBCOMPONENTS
// ============================================================================
function FontImports() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700;800&display=swap');
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes feverPulse {
        0%, 100% { box-shadow: inset 0 0 200px rgba(252, 211, 77, 0.25); }
        50% { box-shadow: inset 0 0 240px rgba(252, 211, 77, 0.45); }
      }
      @keyframes floatPoints {
        0% { opacity: 0; transform: translateY(0) translateX(0) scale(0.8); }
        15% { opacity: 1; transform: translateY(-12px) translateX(0) scale(1.15); }
        80% { opacity: 1; transform: translateY(-36px) translateX(0) scale(1); }
        100% { opacity: 0; transform: translateY(-56px) translateX(0) scale(0.9); }
      }
      @keyframes cardShake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-6px); }
        40% { transform: translateX(6px); }
        60% { transform: translateX(-4px); }
        80% { transform: translateX(4px); }
      }
    `}</style>
  );
}

function GridBg() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.06,
        backgroundImage: 'linear-gradient(rgba(252, 211, 77, 0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(252, 211, 77, 0.6) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    />
  );
}

function ModeButton({ icon, title, subtitle, desc, accent, onClick, special, badge }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="w-full text-left p-4 rounded-2xl border-2 transition-all relative"
      style={{
        borderColor: hover || special ? accent : '#1e3a5f',
        background: special
          ? `linear-gradient(135deg, ${accent}1a 0%, rgba(15, 31, 61, 0.8) 100%)`
          : (hover ? 'rgba(15, 31, 61, 0.95)' : 'rgba(15, 31, 61, 0.7)'),
        backdropFilter: 'blur(4px)',
        boxShadow: special ? `0 0 24px ${accent}33` : 'none',
      }}
    >
      {special && (
        <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider"
          style={{
            background: accent,
            color: '#0a1628',
            boxShadow: `0 4px 12px ${accent}66`,
            letterSpacing: '0.1em',
          }}>
          ⚡ NUEVO
        </div>
      )}
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform"
          style={{
            background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
            color: '#0a1628',
            boxShadow: `0 6px 18px ${accent}40`,
            transform: hover ? 'scale(1.08)' : 'scale(1)',
          }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-1 flex-wrap">
            <h3 className="text-lg font-black tracking-tight" style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: '#fef3c7',
              letterSpacing: '0.04em',
            }}>
              {title}
            </h3>
            <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: '#cbd5e1' }}>
              {subtitle}
            </span>
          </div>
          <p className="text-sm leading-snug mb-1" style={{ color: '#e2e8f0' }}>{desc}</p>
          {badge && (
            <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded text-[11px] font-bold"
              style={{ background: accent + '22', color: accent }}>
              <Trophy size={10} /> {badge}
            </div>
          )}
        </div>
        <ChevronRight size={20} style={{ color: hover ? accent : '#94a3b8' }} className="flex-shrink-0 transition-colors" />
      </div>
    </button>
  );
}
