"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var elm;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.globalStat.deleteMany()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma.vendor.deleteMany()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma.tender.deleteMany()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, prisma.project.deleteMany()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, prisma.award.deleteMany()
                        // Seeding Global Stats
                    ];
                case 5:
                    _a.sent();
                    // Seeding Global Stats
                    return [4 /*yield*/, prisma.globalStat.create({
                            data: {
                                activeTenders: 1100, // 1.1K
                                totalAwardValue: 41000000000, // SAR 41B
                                activeVendors: 2500, // 2.5K
                            },
                        })
                        // Seeding Vendors
                    ];
                case 6:
                    // Seeding Global Stats
                    _a.sent();
                    return [4 /*yield*/, prisma.vendor.create({
                            data: {
                                name: "Elm Company",
                                totalWon: 4800000000,
                                winRate: 78.0,
                                totalAwards: 120, // dummy logic
                                localContent: 65.0, // dummy logic
                                topMinistries: "Ministry of Interior, Ministry of Health",
                            },
                        })];
                case 7:
                    elm = _a.sent();
                    return [4 /*yield*/, prisma.vendor.create({
                            data: {
                                name: "STC Solutions",
                                totalWon: 3500000000,
                                winRate: 65.0,
                                totalAwards: 95,
                                localContent: 70.0,
                                topMinistries: "Ministry of Communications, Ministry of Defense",
                            },
                        })];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, prisma.vendor.create({
                            data: {
                                name: "Saudi Information Tech",
                                totalWon: 2100000000,
                                winRate: 60.0,
                                totalAwards: 50,
                                localContent: 80.0,
                                topMinistries: "PIF, Ministry of Health",
                            },
                        })
                        // Seeding Tenders
                    ];
                case 9:
                    _a.sent();
                    // Seeding Tenders
                    return [4 /*yield*/, prisma.tender.create({
                            data: {
                                title: "Digital Infrastructure Phase II - The Line",
                                ministry: "NEOM",
                                budget: 2400000000,
                                deadline: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000), // In 14 days
                                status: "Closing Soon",
                                category: "IT & Telecommunications",
                            },
                        })];
                case 10:
                    // Seeding Tenders
                    _a.sent();
                    return [4 /*yield*/, prisma.tender.create({
                            data: {
                                title: "Sustainable Water Management",
                                ministry: "Ministry of Environment, Water and Agriculture",
                                budget: 450000000,
                                deadline: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
                                status: "Open",
                                category: "Construction & Utilities",
                            },
                        })
                        // Seeding Projects
                    ];
                case 11:
                    _a.sent();
                    // Seeding Projects
                    return [4 /*yield*/, prisma.project.create({
                            data: {
                                name: "NEOM",
                                totalBudget: 1900000000000, // 1.9T
                                spentToDate: 350000000000,
                                activeSubProjects: 145,
                                progressPercent: 18.5,
                            },
                        })];
                case 12:
                    // Seeding Projects
                    _a.sent();
                    return [4 /*yield*/, prisma.project.create({
                            data: {
                                name: "Red Sea Global",
                                totalBudget: 80000000000,
                                spentToDate: 25000000000,
                                activeSubProjects: 45,
                                progressPercent: 35.0,
                            },
                        })];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, prisma.project.create({
                            data: {
                                name: "Qiddiya",
                                totalBudget: 40000000000,
                                spentToDate: 12000000000,
                                activeSubProjects: 28,
                                progressPercent: 22.0,
                            },
                        })];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, prisma.project.create({
                            data: {
                                name: "Diriyah Gate",
                                totalBudget: 60000000000,
                                spentToDate: 15000000000,
                                activeSubProjects: 36,
                                progressPercent: 25.0,
                            },
                        })
                        // Add dummy award to populate award metrics
                    ];
                case 15:
                    _a.sent();
                    // Add dummy award to populate award metrics
                    return [4 /*yield*/, prisma.award.create({
                            data: {
                                title: "e-Government Services Expansion",
                                vendorId: elm.id,
                                ministry: "Ministry of Interior",
                                amount: 1500000000,
                                startDate: new Date(),
                            }
                        })];
                case 16:
                    // Add dummy award to populate award metrics
                    _a.sent();
                    console.log("Database seeded successfully!");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
