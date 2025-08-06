import { type Game, type Package, type Order, type Testimonial, type Faq, type InsertGame, type InsertPackage, type InsertOrder, type InsertTestimonial, type InsertFaq } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Games
  getGames(): Promise<Game[]>;
  getGameBySlug(slug: string): Promise<Game | undefined>;
  createGame(game: InsertGame): Promise<Game>;

  // Packages
  getPackagesByGameId(gameId: string): Promise<Package[]>;
  getPackageById(id: string): Promise<Package | undefined>;
  createPackage(pkg: InsertPackage): Promise<Package>;

  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderByOrderId(orderId: string): Promise<Order | undefined>;
  updateOrderStatus(orderId: string, status: string): Promise<Order | undefined>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // FAQs
  getFaqs(): Promise<Faq[]>;
  createFaq(faq: InsertFaq): Promise<Faq>;
}

export class MemStorage implements IStorage {
  private games: Map<string, Game>;
  private packages: Map<string, Package>;
  private orders: Map<string, Order>;
  private testimonials: Map<string, Testimonial>;
  private faqs: Map<string, Faq>;

  constructor() {
    this.games = new Map();
    this.packages = new Map();
    this.orders = new Map();
    this.testimonials = new Map();
    this.faqs = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Initialize games
    const gamesData: InsertGame[] = [
      {
        name: "Mobile Legends",
        slug: "mobile-legends",
        description: "Get instant diamonds for Mobile Legends: Bang Bang. Purchase heroes, skins, and other premium content.",
        currency: "Diamonds",
        imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240",
        isPopular: 1,
      },
      {
        name: "Free Fire",
        slug: "free-fire",
        description: "Top up Free Fire diamonds instantly. Get the latest characters, weapons, and cosmetics.",
        currency: "Diamonds",
        imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240",
        isPopular: 1,
      },
      {
        name: "PUBG Mobile",
        slug: "pubg-mobile",
        description: "Purchase UC for PUBG Mobile. Unlock premium battle passes, skins, and exclusive items.",
        currency: "UC",
        imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240",
        isPopular: 1,
      },
      {
        name: "Genshin Impact",
        slug: "genshin-impact",
        description: "Get Genesis Crystals for Genshin Impact. Summon new characters and get exclusive items.",
        currency: "Genesis Crystals",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240",
        isPopular: 1,
      },
    ];

    gamesData.forEach(game => {
      const id = randomUUID();
      this.games.set(id, { 
        ...game, 
        id,
        isPopular: game.isPopular ?? 0
      });
    });

    // Initialize packages for each game
    const gameIds = Array.from(this.games.keys());
    
    // Mobile Legends packages
    const mlGameId = gameIds[0];
    const mlPackages: InsertPackage[] = [
      { gameId: mlGameId, name: "86 Diamonds", amount: 86, price: 15000, isPopular: 0 },
      { gameId: mlGameId, name: "172 Diamonds", amount: 172, price: 28000, isPopular: 1 },
      { gameId: mlGameId, name: "257 Diamonds", amount: 257, price: 42000, isPopular: 0 },
      { gameId: mlGameId, name: "344 Diamonds", amount: 344, price: 56000, isPopular: 0 },
    ];

    mlPackages.forEach(pkg => {
      const id = randomUUID();
      this.packages.set(id, { 
        ...pkg, 
        id,
        isPopular: pkg.isPopular ?? 0
      });
    });

    // Free Fire packages
    const ffGameId = gameIds[1];
    const ffPackages: InsertPackage[] = [
      { gameId: ffGameId, name: "100 Diamonds", amount: 100, price: 12000, isPopular: 0 },
      { gameId: ffGameId, name: "210 Diamonds", amount: 210, price: 25000, isPopular: 1 },
      { gameId: ffGameId, name: "355 Diamonds", amount: 355, price: 40000, isPopular: 0 },
      { gameId: ffGameId, name: "720 Diamonds", amount: 720, price: 80000, isPopular: 0 },
    ];

    ffPackages.forEach(pkg => {
      const id = randomUUID();
      this.packages.set(id, { 
        ...pkg, 
        id,
        isPopular: pkg.isPopular ?? 0
      });
    });

    // Initialize testimonials
    const testimonialsData: InsertTestimonial[] = [
      {
        customerName: "Ahmad Rahman",
        rating: 5,
        comment: "Super cepat dan mudah! Diamonds langsung masuk dalam hitungan menit. Recommended banget!",
        isActive: 1,
      },
      {
        customerName: "Siti Nurhaliza",
        rating: 5,
        comment: "Pelayanan customer service sangat baik dan responsif. Harga juga kompetitif dibanding tempat lain.",
        isActive: 1,
      },
      {
        customerName: "Budi Santoso",
        rating: 5,
        comment: "Udah langganan top-up di sini. Selalu trusted dan gak pernah ada masalah. Top!",
        isActive: 1,
      },
    ];

    testimonialsData.forEach(testimonial => {
      const id = randomUUID();
      this.testimonials.set(id, { 
        ...testimonial, 
        id,
        isActive: testimonial.isActive ?? 1
      });
    });

    // Initialize FAQs
    const faqsData: InsertFaq[] = [
      {
        question: "How long does delivery take?",
        answer: "Most orders are processed within 1-5 minutes. During peak hours, it may take up to 15 minutes. You'll receive instant notification once your order is complete.",
        isActive: 1,
      },
      {
        question: "Is my payment information secure?",
        answer: "Yes, we use industry-standard encryption and work with trusted payment providers to ensure your information is completely secure.",
        isActive: 1,
      },
      {
        question: "What if I enter wrong User ID?",
        answer: "Please double-check your User ID before submitting. If you've made an error, contact our support team immediately with your order ID and we'll help resolve the issue.",
        isActive: 1,
      },
      {
        question: "Do you offer refunds?",
        answer: "Refunds are available within 24 hours if the order hasn't been processed yet. Once credits are delivered to your game account, refunds are not possible due to the nature of digital goods.",
        isActive: 1,
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept QRIS, DANA, OVO, Bank Transfer, and major credit cards. All payments are processed securely through our trusted payment partners.",
        isActive: 1,
      },
    ];

    faqsData.forEach(faq => {
      const id = randomUUID();
      this.faqs.set(id, { 
        ...faq, 
        id,
        isActive: faq.isActive ?? 1
      });
    });
  }

  async getGames(): Promise<Game[]> {
    return Array.from(this.games.values());
  }

  async getGameBySlug(slug: string): Promise<Game | undefined> {
    return Array.from(this.games.values()).find(game => game.slug === slug);
  }

  async createGame(game: InsertGame): Promise<Game> {
    const id = randomUUID();
    const newGame: Game = { 
      ...game, 
      id,
      isPopular: game.isPopular ?? 0
    };
    this.games.set(id, newGame);
    return newGame;
  }

  async getPackagesByGameId(gameId: string): Promise<Package[]> {
    return Array.from(this.packages.values()).filter(pkg => pkg.gameId === gameId);
  }

  async getPackageById(id: string): Promise<Package | undefined> {
    return this.packages.get(id);
  }

  async createPackage(pkg: InsertPackage): Promise<Package> {
    const id = randomUUID();
    const newPackage: Package = { 
      ...pkg, 
      id,
      isPopular: pkg.isPopular ?? 0
    };
    this.packages.set(id, newPackage);
    return newPackage;
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const orderId = `TZ${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const newOrder: Order = {
      ...order,
      id,
      orderId,
      serverId: order.serverId ?? null,
      whatsappNumber: order.whatsappNumber ?? null,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.orders.set(id, newOrder);
    return newOrder;
  }

  async getOrderByOrderId(orderId: string): Promise<Order | undefined> {
    return Array.from(this.orders.values()).find(order => order.orderId === orderId);
  }

  async updateOrderStatus(orderId: string, status: string): Promise<Order | undefined> {
    const order = Array.from(this.orders.values()).find(order => order.orderId === orderId);
    if (order) {
      order.status = status;
      order.updatedAt = new Date();
      this.orders.set(order.id, order);
      return order;
    }
    return undefined;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(t => t.isActive === 1);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const newTestimonial: Testimonial = { 
      ...testimonial, 
      id,
      isActive: testimonial.isActive ?? 1
    };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  async getFaqs(): Promise<Faq[]> {
    return Array.from(this.faqs.values()).filter(f => f.isActive === 1);
  }

  async createFaq(faq: InsertFaq): Promise<Faq> {
    const id = randomUUID();
    const newFaq: Faq = { 
      ...faq, 
      id,
      isActive: faq.isActive ?? 1
    };
    this.faqs.set(id, newFaq);
    return newFaq;
  }
}

export const storage = new MemStorage();
