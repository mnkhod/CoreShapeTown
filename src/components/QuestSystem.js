import { EventEmitter } from "events";
import { mintGoodInvitationAchievement } from "../game/utility";

class QuestSystem extends EventEmitter {
    constructor() {
        super();

        if (!QuestSystem.instance) {
            this.initializeSystem();
            QuestSystem.instance = this;
        }

        return QuestSystem.instance;
    }

    initializeSystem() {
        this.quests = {};
        this.activeQuests = new Set();
        this.completedQuests = new Set();
        this.playerProgress = {};

        this.initializeQuestData();
    }

    resetDailyQuest(questId) {
        const quest = this.quests[questId];
        if (!quest) return;

        console.log(`Resetting daily quest ${questId} for tomorrow`);

        quest.completed = false;

        Object.values(quest.subtasks).forEach((subtask) => {
            subtask.completed = false;
        });

        this.activeQuests.add(questId);

        this.completedQuests.delete(questId);

        this.emit("quest:reset", { questId });
        console.log(
            `Daily quest ${questId} has been reset and is ready for tomorrow`
        );
    }

    initializeQuestData() {
        this.quests = {
            "001": {
                id: "001",
                title: "The First Harvest",
                description: "Learn the basics of farming",
                category: "Main Quest",
                location: "Farm area",
                prerequisites: "none",
                questGiver: "NPC Jack",
                completed: false,
                active: false,
                subtasks: {
                    "001-1": {
                        id: "001-1",
                        text: "Use a Pickaxe to remove rocks.",
                        completed: false,
                    },
                    "001-2": {
                        id: "001-2",
                        text: "Prepare the ground to plant seeds. Use a Hoe tool to get Soil.",
                        completed: false,
                    },
                    "001-3": {
                        id: "001-3",
                        text: "Plant carrot seeds. Select a bag of seeds, click on already prepared soil.",
                        completed: false,
                    },
                    "001-4": {
                        id: "001-4",
                        text: "Water the planted seed. Select the watering can to water, click on soil planted with seed.",
                        completed: false,
                    },
                    "001-5": {
                        id: "001-5",
                        text: "Harvest the goods. Click on already grown carrot.",
                        completed: false,
                    },
                    "001-6": {
                        id: "001-6",
                        text: "Go back to meet Jack.",
                        completed: false,
                    },
                },
                reward: "Pickaxe, Hoe, Watering Can, Carrot seeds x5",
            },
            "002": {
                id: "002",
                title: "Taste of Gold",
                description: "Learn about trading in Shape Town",
                category: "Main Quest",
                location: "Farm and Town area",
                prerequisites: "#001",
                questGiver: "NPC Jack",
                completed: false,
                active: false,
                subtasks: {
                    "002-1": {
                        id: "002-1",
                        text: "Go meet NPC Jack",
                        completed: false,
                    },
                    "002-2": {
                        id: "002-2",
                        text: "Go to Shape Town",
                        completed: false,
                    },
                    "002-3": {
                        id: "002-3",
                        text: "Find and meet NPC Lady Lydia",
                        completed: false,
                    },
                    "002-4": {
                        id: "002-4",
                        text: "Sell items from NPC Jack",
                        completed: false,
                    },
                },
                reward: "Taste of gold achievement + 1000 gold",
            },
            "003": {
                id: "003",
                title: "Good Invitation",
                description: "Get to know the townspeople",
                category: "Main Quest",
                location: "Farm, Town, Beach",
                prerequisites: "#002",
                questGiver: "Game System",
                completed: false,
                active: false,
                subtasks: {
                    "003-1": {
                        id: "003-1",
                        text: "Go greeting with everyone in town NPCs",
                        completed: false,
                    },
                },
                reward: "Good Invitation achievement",
            },
            "004": {
                id: "004",
                title: "Master of the Fields",
                description: "Become a farming expert",
                category: "Main Quest",
                location: "Farm area",
                prerequisites: "#002 Have to meet NPC Lily",
                questGiver: "Game System",
                completed: false,
                active: false,
                subtasks: {
                    "004-1": {
                        id: "004-1",
                        text: "Successfully grow one of each crop type",
                        completed: false,
                    },
                },
                reward: "Open next tier item on Farming",
            },
            "005": {
                id: "005",
                title: "Adventure Quest",
                description: "Help Victoria with a monster problem",
                category: "Daily Quest",
                location: "Beach area",
                prerequisites: "#002 Have to meet NPC Victoria",
                questGiver: "NPC Victoria",
                completed: false,
                active: false,
                subtasks: {
                    "005-1": {
                        id: "005-1",
                        text: "Meet the NPC Victoria",
                        completed: false,
                    },
                    "005-2": {
                        id: "005-2",
                        text: "Go to the beach",
                        completed: false,
                    },
                    "005-3": {
                        id: "005-3",
                        text: "Kill all of the Monsters",
                        completed: false,
                    },
                    "005-4": {
                        id: "005-4",
                        text: "Report Back to NPC Victoria",
                        completed: false,
                    },
                },
                reward: "Everyday 50g",
            },
            "006": {
                id: "006",
                title: "Goblin Slayer",
                description: "Clear the South Hill of goblins",
                category: "Daily Quest",
                location: "South Hill",
                prerequisites: "#002 Have to meet NPC Commander Rowan",
                questGiver: "NPC Rowan",
                completed: false,
                active: false,
                subtasks: {
                    "006-1": {
                        id: "006-1",
                        text: "Meet the NPC Commander Rowan",
                        completed: false,
                    },
                    "006-2": {
                        id: "006-2",
                        text: "Go to the South Hill",
                        completed: false,
                    },
                    "006-3": {
                        id: "006-3",
                        text: "Kill all of the Goblins",
                        completed: false,
                    },
                    "006-4": {
                        id: "006-4",
                        text: "Report Back to NPC Commander Rowan",
                        completed: false,
                    },
                },
                reward: "15g each Goblin ear",
            },
            "007": {
                id: "007",
                title: "Treasure From Sea",
                description: "Collect seashells for Lydia",
                category: "Daily Quest",
                location: "Beach area",
                prerequisites: "#002 Have to meet NPC Lydia",
                questGiver: "NPC Lydia",
                completed: false,
                active: false,
                subtasks: {
                    "007-1": {
                        id: "007-1",
                        text: "Meet the NPC Lydia",
                        completed: false,
                    },
                    "007-2": {
                        id: "007-2",
                        text: "Go to the beach",
                        completed: false,
                    },
                    "007-3": {
                        id: "007-3",
                        text: "Collect the seashells from the beach",
                        completed: false,
                    },
                    "007-4": {
                        id: "007-4",
                        text: "Back to meet NPC Lydia",
                        completed: false,
                    },
                },
                reward: "15g each seashell",
            },
            "008": {
                id: "008",
                title: "Yam, Yam",
                description: "Learn to cook with carrots",
                category: "Side Quest",
                location: "Town area",
                prerequisites: "#002",
                questGiver: "NPC Lily",
                completed: false,
                active: false,
                subtasks: {
                    "008-1": {
                        id: "008-1",
                        text: 'Cook "Carrot Soup" using a recipe from NPC Lily',
                        completed: false,
                    },
                },
                reward: "Yam, Yam achievement, Recipe: Steamed Carrot",
            },
            "012": {
                id: "012",
                title: "Every Day!",
                description: "Give 5 carrots to NPC Jack",
                category: "Daily Quest",
                location: "Farm area",
                prerequisites: "none",
                questGiver: "NPC Jack",
                completed: false,
                active: true,
                subtasks: {
                    "012-1": {
                        id: "012-1",
                        text: "Give 5 carrots to NPC Jack",
                        completed: false,
                    },
                },
                reward: "5 carrot seeds",
            },
        };

        this.activeQuests.add("001");
    }

    getQuestProgress() {
        const progress = {};

        Object.values(this.quests).forEach((quest) => {
            progress[quest.id] = {
                completed: quest.completed,
                subtasks: {},
            };

            Object.values(quest.subtasks).forEach((subtask) => {
                progress[quest.id].subtasks[subtask.id] = subtask.completed;
            });
        });

        return progress;
    }

    updateQuestProgress(update) {
        const questId = Object.keys(update)[0];
        const quest = this.quests[questId];

        if (!quest) return;

        if (update[questId].subtasks) {
            Object.entries(update[questId].subtasks).forEach(
                ([subtaskId, completed]) => {
                    this.updateSubtask(questId, subtaskId, completed);
                }
            );
        }
    }

    updateSubtask(questId, subtaskId, completed = true) {
        console.log(
            `Attempting to update subtask ${questId}-${subtaskId} to ${completed}`
        );

        if (!this.isQuestActive(questId)) {
            console.warn(
                `Cannot update subtask: Quest ${questId} is not active`
            );
            return;
        }

        const quest = this.quests[questId];
        if (!quest) {
            console.warn(`Cannot update subtask: Quest ${questId} not found`);
            return;
        }

        const subtask = quest.subtasks[subtaskId];
        if (!subtask) {
            console.warn(
                `Cannot update subtask: Subtask ${subtaskId} not found in quest ${questId}`
            );
            return;
        }

        subtask.completed = completed;
        console.log(`Updated subtask ${questId}-${subtaskId} to ${completed}`);

        const allCompleted = Object.values(quest.subtasks).every(
            (st) => st.completed
        );

        if (allCompleted) {
            this.completeQuest(questId);
        }

        this.emit("quest:updated", {
            questId,
            subtaskId,
            completed: subtask.completed,
            questCompleted: allCompleted,
        });

        return allCompleted;
    }

    completeQuest(questId) {
        const quest = this.quests[questId];
        if (!quest) return;

        quest.completed = true;
        this.activeQuests.delete(questId);
        this.completedQuests.add(questId);

        console.log(`Quest ${questId} completed!`);

        this.checkQuestPrerequisites();

        this.emit("quest:completed", { questId });
    }

    activateQuest(questId) {
        const quest = this.quests[questId];
        if (!quest) return;

        quest.active = true;
        this.activeQuests.add(questId);

        console.log(`Quest ${questId} activated!`);

        Object.values(quest.subtasks).forEach((subtask) => {
            if (!subtask.completed) {
                subtask.completed = false;
            }
        });

        if (questId === "003") {
            if (this.scenes) {
                const sceneArray = Array.isArray(this.scenes)
                    ? this.scenes
                    : [this.scenes];
                sceneArray.forEach((scene) => {
                    const questData =
                        scene.game?.registry?.get("questData") || {};
                    if (questData.metNPCs && Array.isArray(questData.metNPCs)) {
                        if (!scene.greetedNPCs) {
                            scene.greetedNPCs = new Set();
                        }
                        questData.metNPCs.forEach((npc) => {
                            scene.greetedNPCs.add(npc);
                            console.log(
                                `Retroactively marked ${npc} as greeted for Quest #003`
                            );
                        });
                    }
                });
            }
        }

        this.emit("quest:activated", { questId });
    }

    checkQuestPrerequisites() {
        Object.values(this.quests).forEach((quest) => {
            if (quest.completed || quest.active) return;

            const prereq = quest.prerequisites;
            if (prereq === "none") {
                this.activateQuest(quest.id);
                return;
            }

            if (prereq.startsWith("#")) {
                const prereqId = prereq.substring(1);
                if (this.isQuestCompleted(prereqId)) {
                    this.activateQuest(quest.id);
                }
            }
        });
    }

    isQuestActive(questId) {
        return this.activeQuests.has(questId);
    }

    isQuestCompleted(questId) {
        return this.completedQuests.has(questId);
    }

    getActiveQuests() {
        return Array.from(this.activeQuests).map((id) => this.quests[id]);
    }

    getCompletedQuests() {
        return Array.from(this.completedQuests).map((id) => this.quests[id]);
    }

    getAllQuests() {
        return Object.values(this.quests);
    }

    registerScenes(scenes) {
        this.scenes = scenes;
    }

    async handleEvent(eventName, params) {
        console.log("Quest event received:", eventName, params);

        switch (eventName) {
            case "harvest:rockRemoved":
                this.updateSubtask("001", "001-1");
                break;

            case "harvest:groundHoed":
                this.updateSubtask("001", "001-2");
                break;

            case "harvest:seedPlanted":
                if (params.crop === "CARROT" || params.seed === "CARROT") {
                    this.updateSubtask("001", "001-3");
                }
                break;

            case "harvest:cropWatered":
                this.updateSubtask("001", "001-4");
                break;

            case "harvest:cropHarvested":
                if (params.crop === "CARROT") {
                    this.updateSubtask("001", "001-5");
                }
                break;

            case "npc:jackInteraction":
                const harvestStep = this.quests["001"]?.subtasks["001-5"];
                if (harvestStep && harvestStep.completed) {
                    this.updateSubtask("001", "001-6");
                }

                if (
                    this.isQuestActive("002") &&
                    !this.quests["002"].subtasks["002-1"].completed
                ) {
                    console.log("Completing subtask 002-1: Go meet NPC Jack");
                    this.updateSubtask("002", "002-1");
                }
                break;

            // --- Quest #002: Taste of Gold ---
            case "quest:taste-of-gold-activated":
                if (
                    !this.isQuestActive("002") &&
                    !this.isQuestCompleted("002")
                ) {
                    console.log("Activating Taste of Gold quest");
                    this.activateQuest("002");

                    if (params.scene && params.scene.alertPrefab) {
                        params.scene.alertPrefab.alert(
                            "New Quest: Taste of Gold"
                        );
                    } else if (
                        params.npc &&
                        params.npc.scene &&
                        params.npc.scene.alertPrefab
                    ) {
                        params.npc.scene.alertPrefab.alert(
                            "New Quest: Taste of Gold"
                        );
                    }
                }
                break;

            case "player:enteredTown":
                if (this.isQuestActive("002")) {
                    console.log("Completing subtask 002-2: Go to Shape Town");
                    this.updateSubtask("002", "002-2");

                    if (params.scene && params.scene.alertPrefab) {
                        params.scene.alertPrefab.alert(
                            "Quest Updated: Entered Town"
                        );
                    }
                }
                break;

            case "npc:lydiaInteraction":
                if (this.isQuestActive("002")) {
                    console.log("Completing subtask 002-3: Meet Lady Lydia");
                    this.updateSubtask("002", "002-3");

                    if (params.scene && params.scene.alertPrefab) {
                        params.scene.alertPrefab.alert(
                            "Quest Updated: Met Lady Lydia"
                        );
                    }
                }
                if (this.isQuestActive("003")) {
                    if (!params.scene.greetedNPCs)
                        params.scene.greetedNPCs = new Set();
                    params.scene.greetedNPCs.add("Lydia");

                    if (
                        params.scene.greetedNPCs.size >= 4 &&
                        params.scene.greetedNPCs.has("Lydia") &&
                        params.scene.greetedNPCs.has("Victoria") &&
                        params.scene.greetedNPCs.has("Rowan") &&
                        params.scene.greetedNPCs.has("Lily")
                    ) {
                        this.updateSubtask("003", "003-1", true);
                    }
                }
                break;

            case "quest:sold-items-to-lydia":
                if (
                    this.isQuestActive("002") &&
                    !this.quests["002"].subtasks["002-4"].completed
                ) {
                    console.log(
                        "Completing subtask 002-4: Sell items from NPC Jack"
                    );
                    this.updateSubtask("002", "002-4", true);

                    if (params.scene && params.scene.gold !== undefined) {
                        params.scene.gold += 1000;
                        console.log("Added 1000 gold reward");
                    } else if (
                        params.npc &&
                        params.npc.scene &&
                        params.npc.scene.gold !== undefined
                    ) {
                        params.npc.scene.gold += 1000;
                        console.log("Added 1000 gold reward");
                    }

                    if (params.scene && params.scene.alertPrefab) {
                        params.scene.alertPrefab.alert(
                            "Quest Complete: Taste of Gold"
                        );
                    } else if (
                        params.npc &&
                        params.npc.scene &&
                        params.npc.scene.alertPrefab
                    ) {
                        params.npc.scene.alertPrefab.alert(
                            "Quest Complete: Taste of Gold"
                        );
                    }

                    if (this.isQuestCompleted("002")) {
                        // Activate Quest #003
                        this.activateQuest("003");
                        console.log("Quest #003 activated: Good Invitation");

                        if (params.scene && params.scene.alertPrefab) {
                            setTimeout(() => {
                                params.scene.alertPrefab.alert(
                                    "New Quest: Good Invitation - Meet everyone in town!"
                                );
                            }, 3000);
                        } else if (
                            params.npc &&
                            params.npc.scene &&
                            params.npc.scene.alertPrefab
                        ) {
                            setTimeout(() => {
                                params.npc.scene.alertPrefab.alert(
                                    "New Quest: Good Invitation - Meet everyone in town!"
                                );
                            }, 3000);
                        }
                    }
                }
                break;

            // --- Quest #003: Good Invitation ---
            case "npc:allGreeted":
                if (this.isQuestActive("003")) {
                    console.log(
                        "Quest 003: Completing 'All NPCs greeted' subtask"
                    );
                    const completed = this.updateSubtask("003", "003-1");

                    if (completed) {
                        console.log(
                            "Quest 003: All NPCs greeted, quest completed!"
                        );

                        if (params.scene && params.scene.alertPrefab) {
                            await mintGoodInvitationAchievement({
                                onSuccess: () => {
                                    params.scene.alertPrefab.alert("Quest Complete: Good Invitation");
                                    params.scene.achievements.goodInvitationAchievement = true;
                                },
                                onError: () => {
                                    this.scene.alertPrefab.alert("Minting Error Happened");
                                }
                            })
                        } else if (
                            params.npc &&
                            params.npc.scene &&
                            params.npc.scene.alertPrefab
                        ) {
                            params.npc.scene.alertPrefab.alert(
                                "Quest Complete: Good Invitation"
                            );
                        }
                    }
                }
                break;
            // --- Quest #007: Treasure From Sea ---
            case "npc:lydiaSeashellQuest":
                if (
                    !this.isQuestActive("007") &&
                    !this.isQuestCompleted("007") &&
                    this.isQuestCompleted("002")
                ) {
                    console.log("Activating Treasure From Sea quest");
                    this.activateQuest("007");

                    // Show notification
                    if (params.scene && params.scene.alertPrefab) {
                        params.scene.alertPrefab.alert(
                            "New Quest: Treasure From Sea"
                        );
                    } else if (
                        params.npc &&
                        params.npc.scene &&
                        params.npc.scene.alertPrefab
                    ) {
                        params.npc.scene.alertPrefab.alert(
                            "New Quest: Treasure From Sea"
                        );
                    }
                }
                if (
                    this.isQuestActive("007") &&
                    !this.quests["007"].subtasks["007-1"].completed
                ) {
                    this.updateSubtask("007", "007-1");

                    if (params.scene && params.scene.alertPrefab) {
                        params.scene.alertPrefab.alert(
                            "Quest Updated: Met Lydia"
                        );
                    }
                }
                break;

            case "player:enteredBeach":
                if (
                    this.isQuestActive("007") &&
                    !this.quests["007"].subtasks["007-2"].completed
                ) {
                    console.log("Completing subtask 007-2: Go to the beach");
                    this.updateSubtask("007", "007-2");

                    if (params.scene && params.scene.alertPrefab) {
                        params.scene.alertPrefab.alert(
                            "Quest Updated: Arrived at Beach"
                        );
                    }
                }
                break;

            case "item:seashellCollected":
                if (
                    this.isQuestActive("007") &&
                    this.quests["007"].subtasks["007-2"].completed
                ) {
                    if (!this.quests["007"].subtasks["007-3"].completed) {
                        if (!params.scene.collectedSeashells) {
                            params.scene.collectedSeashells = 0;
                        }

                        params.scene.collectedSeashells++;

                        if (params.scene && params.scene.alertPrefab) {
                            params.scene.alertPrefab.alert(
                                `Seashell Collected (${params.scene.collectedSeashells}/5)`
                            );
                        }

                        if (params.scene.collectedSeashells >= 5) {
                            console.log(
                                "Completing subtask 007-3: Collect the seashells from the beach"
                            );
                            this.updateSubtask("007", "007-3");

                            if (params.scene && params.scene.alertPrefab) {
                                params.scene.alertPrefab.alert(
                                    "Quest Updated: All Seashells Collected"
                                );
                            }
                        }
                    }
                }
                break;

            case "npc:lydiaSeashellDelivery":
                if (
                    this.isQuestActive("007") &&
                    this.quests["007"].subtasks["007-3"].completed &&
                    !this.quests["007"].subtasks["007-4"].completed
                ) {
                    console.log(
                        "Completing subtask 007-4: Back to meet NPC Lydia"
                    );
                    this.updateSubtask("007", "007-4");

                    const seashellCount = params.scene.collectedSeashells || 5;
                    const goldReward = seashellCount * 15;

                    if (params.scene && params.scene.gold !== undefined) {
                        params.scene.gold += goldReward;
                        console.log(
                            `Added ${goldReward} gold reward for ${seashellCount} seashells`
                        );
                    } else if (
                        params.npc &&
                        params.npc.scene &&
                        params.npc.scene.gold !== undefined
                    ) {
                        params.npc.scene.gold += goldReward;
                        console.log(
                            `Added ${goldReward} gold reward for ${seashellCount} seashells`
                        );
                    }

                    if (params.scene && params.scene.alertPrefab) {
                        params.scene.alertPrefab.alert(
                            `Quest Complete: Treasure From Sea (Reward: ${goldReward} gold)`
                        );
                    } else if (
                        params.npc &&
                        params.npc.scene &&
                        params.npc.scene.alertPrefab
                    ) {
                        params.npc.scene.alertPrefab.alert(
                            `Quest Complete: Treasure From Sea (Reward: ${goldReward} gold)`
                        );
                    }
                }
                break;

            // --- Quest #008: Yam, Yam ---
            case "npc:lilyRecipeQuest":
                if (
                    !this.isQuestActive("008") &&
                    !this.isQuestCompleted("008") &&
                    this.isQuestCompleted("002")
                ) {
                    console.log("Activating Yam, Yam quest");
                    this.activateQuest("008");

                    if (params.scene && params.scene.alertPrefab) {
                        params.scene.alertPrefab.alert(
                            "New Quest: Yam, Yam - Learn to cook with carrots"
                        );
                    } else if (
                        params.npc &&
                        params.npc.scene &&
                        params.npc.scene.alertPrefab
                    ) {
                        params.npc.scene.alertPrefab.alert(
                            "New Quest: Yam, Yam - Learn to cook with carrots"
                        );
                    }

                    params.scene.receivedCarrotSoupRecipe = true;
                }
                break;

            case "cooking:recipeCooked":
                if (
                    this.isQuestActive("008") &&
                    params.recipeName &&
                    params.recipeName.toLowerCase().includes("carrot soup")
                ) {
                    console.log("Completing subtask 008-1: Cook Carrot Soup");
                    this.updateSubtask("008", "008-1");

                    if (params.scene && params.scene.playerInventory) {
                        params.scene.playerInventory.addRecipe(
                            "Steamed Carrot"
                        );
                        console.log("Added Steamed Carrot recipe to inventory");
                    }

                    if (params.scene && params.scene.alertPrefab) {
                        params.scene.alertPrefab.alert(
                            "Quest Complete: Yam, Yam! Learned Steamed Carrot recipe"
                        );
                    }
                }
                break;

            // --- Quest #012: Every Day! ---
            case "harvest:carrotsGivenToJack":
                if (this.isQuestActive("012")) {
                    const carrotsGiven = params.carrotCount || 0;

                    if (!this.quests["012"].subtasks["012-1"].completed) {
                        if (!params.scene.carrotsGivenToJack) {
                            params.scene.carrotsGivenToJack = 0;
                        }

                        params.scene.carrotsGivenToJack += carrotsGiven;
                        console.log(
                            `Carrots given to Jack: ${params.scene.carrotsGivenToJack}/5`
                        );

                        if (params.scene && params.scene.alertPrefab) {
                            params.scene.alertPrefab.alert(
                                `Gave carrots to Jack (${params.scene.carrotsGivenToJack}/5)`
                            );
                        }

                        if (params.scene.carrotsGivenToJack >= 5) {
                            console.log(
                                "Completing subtask 012-1: Give 5 carrots to NPC Jack"
                            );
                            this.updateSubtask("012", "012-1");

                            if (params.scene && params.scene.playerInventory) {
                                params.scene.playerInventory.addItem(
                                    "CARROT_SEED",
                                    5
                                );
                                console.log(
                                    "Added 5 carrot seeds to inventory"
                                );
                            }

                            if (params.scene && params.scene.alertPrefab) {
                                params.scene.alertPrefab.alert(
                                    "Quest Complete: Every Day! Received 5 carrot seeds"
                                );
                            }

                            setTimeout(() => {
                                this.resetDailyQuest("012");
                            }, 5000);
                        }
                    }
                }
                break;
            case "npc:greetedByName":
                if (this.isQuestActive("003") && params.npcName) {
                    console.log(`NPC greeted by name: ${params.npcName}`);
                    if (params.scene && params.scene.markNPCGreeted) {
                        params.scene.markNPCGreeted(params.npcName);
                    }
                }
                break;

            default:
                console.log(`No specific handling for event: ${eventName}`);
                break;
        }
    }
}

const questSystem = new QuestSystem();

export default questSystem;

export function extendSceneWithQuests(scene) {
    if (typeof scene === "function") {
        const SceneClass = scene;
        const originalCreate = SceneClass.prototype.create;
        const originalUpdate = SceneClass.prototype.update;

        SceneClass.prototype.create = function () {
            if (originalCreate) {
                originalCreate.call(this);
            }

            setupQuestFunctionalityForScene(this);
            setupDirectNPCGreetingHooks(this);
        };

        SceneClass.prototype.update = function (time, delta) {
            if (originalUpdate) {
                originalUpdate.call(this, time, delta);
            }

            if (this.updateQuestUI) {
                this.updateQuestUI();
            }
        };

        SceneClass.prototype.setupQuestUI = function () {
            // Implementation as before...
        };

        SceneClass.prototype.updateQuestUI = function () {
            // Implementation as before...
        };

        SceneClass.prototype.showQuestNotification = function (message) {
            // Implementation as before...
        };

        SceneClass.prototype.triggerQuestEvent = function (
            eventName,
            params = {}
        ) {
            // Implementation as before...
        };

        return SceneClass;
    } else {
        const instance = scene;

        setupQuestFunctionalityForScene(instance);
        setupDirectNPCGreetingHooks(instance);
        instance.setupQuestUI = function () {
            // Implementation as before...
        };

        instance.updateQuestUI = function () {
            // Implementation as before...
        };

        instance.showQuestNotification = function (message) {
            console.log(`QUEST NOTIFICATION: ${message}`);

            if (this.alertPrefab && this.alertPrefab.alert) {
                this.alertPrefab.alert(message);
            }
        };

        instance.triggerQuestEvent = function (eventName, params = {}) {
            console.log(`Triggering quest event: ${eventName}`, params);
            params.scene = this;
            questSystem.handleEvent(eventName, params);
        };

        return instance;
    }
}

function setupQuestFunctionalityForScene(scene) {
    if (scene.setupQuestUI) {
        scene.setupQuestUI();
    }

    questSystem.registerScenes(scene);
    scene.questSystem = questSystem;
}

export function setupTownDetection(scene) {
    console.log("Setting up town detection for quest progress");

    const townZone = scene.add.zone(
        scene.townCenterX || 500,
        scene.townCenterY || 500,
        scene.townWidth || 600,
        scene.townHeight || 400
    );

    scene.physics.world.enable(townZone);
    townZone.body.setAllowGravity(false);
    townZone.body.moves = false;

    scene.physics.add.overlap(
        scene.playerPrefab,
        townZone,
        () => {
            if (!scene.playerEnteredTown) {
                scene.playerEnteredTown = true;

                if (scene.triggerQuestEvent) {
                    console.log("Player entered town - triggering quest event");
                    scene.triggerQuestEvent("player:enteredTown");
                } else {
                    console.warn("triggerQuestEvent not available on scene");
                }
            }
        },
        null,
        scene
    );

    return townZone;
}

export function setupNPCGreetingTracking(scene) {
    console.log("### SETTING UP IMPROVED NPC TRACKING SYSTEM ###");
    scene.greetedNPCs = new Set();
    console.log("Reset greetedNPCs to empty set");

    const npcsToGreet = ["Lydia", "Victoria", "Rowan", "Lily"];

    scene.createGreetingCounter = function () {
        console.log("Creating greeting counter UI");

        if (this.greetingCounterBg) {
            this.greetingCounterBg.destroy();
            this.greetingCounterTitle?.destroy();
            this.greetingCounterProgress?.destroy();
            if (this.npcTextObjects) {
                Object.values(this.npcTextObjects).forEach((text) =>
                    text.destroy()
                );
            }
        }

        this.greetingCounterBg = this.add
            .rectangle(10, 10, 200, 130, 0x000000, 0.7)
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setDepth(100);

        this.greetingCounterTitle = this.add
            .text(20, 15, "Quest #003: Good Invitation", {
                fontFamily: "malio",
                fontSize: "14px",
                fontWeight: "bold",
                color: "#ffffff",
            })
            .setScrollFactor(0)
            .setDepth(101);

        this.greetingCounterProgress = this.add
            .text(20, 35, `Progress: 0/${npcsToGreet.length} NPCs`, {
                fontFamily: "malio",
                fontSize: "12px",
                color: "#ffffff",
            })
            .setScrollFactor(0)
            .setDepth(101);

        this.npcTextObjects = {};
        npcsToGreet.forEach((npc, index) => {
            this.npcTextObjects[npc] = this.add
                .text(30, 55 + index * 15, `□ ${npc}`, {
                    fontFamily: "malio",
                    fontSize: "12px",
                    color: "#aaaaaa",
                })
                .setScrollFactor(0)
                .setDepth(101);
        });

        this.updateGreetingCounterVisibility();

        return this.greetingCounterBg;
    };

    scene.updateGreetingCounterVisibility = function () {
        const questSystem = this.questSystem || window.questSystem;
        if (!questSystem) return;

        const isQuestActive = questSystem.isQuestActive("003");
        const isQuestCompleted = questSystem.isQuestCompleted("003");

        const shouldShow = isQuestActive && !isQuestCompleted;

        console.log(`Counter visibility: ${shouldShow ? "visible" : "hidden"}`);
        console.log(
            `Quest #003 active: ${isQuestActive}, completed: ${isQuestCompleted}`
        );

        if (this.greetingCounterBg) {
            this.greetingCounterBg.setVisible(shouldShow);
        }

        if (this.greetingCounterTitle) {
            this.greetingCounterTitle.setVisible(shouldShow);
        }

        if (this.greetingCounterProgress) {
            this.greetingCounterProgress.setVisible(shouldShow);
        }

        if (this.npcTextObjects) {
            Object.values(this.npcTextObjects).forEach((text) => {
                text.setVisible(shouldShow);
            });
        }
    };
    scene.updateGreetingCounter = function () {
        if (!this.greetingCounterProgress) return;

        if (!this.greetedNPCs) {
            this.greetedNPCs = new Set();
        }

        const greetedCount = this.greetedNPCs.size;

        console.log(
            `Currently greeted NPCs (${greetedCount}):`,
            Array.from(this.greetedNPCs)
        );

        this.greetingCounterProgress.setText(
            `Progress: ${greetedCount}/${npcsToGreet.length} NPCs`
        );

        npcsToGreet.forEach((npc) => {
            if (this.npcTextObjects[npc]) {
                if (this.greetedNPCs.has(npc)) {
                    this.npcTextObjects[npc].setText(`✓ ${npc}`);
                    this.npcTextObjects[npc].setColor("#00ff00");
                } else {
                    this.npcTextObjects[npc].setText(`□ ${npc}`);
                    this.npcTextObjects[npc].setColor("#aaaaaa");
                }
            }
        });

        if (greetedCount === npcsToGreet.length && this.greetingCounterTitle) {
            this.greetingCounterTitle.setColor("#00ff00");
        }
    };

    scene.checkAllNPCsGreeted = function () {
        console.log("=== CHECKING IF ALL NPCS GREETED ===");
        console.log("Required NPCs:", npcsToGreet);
        console.log(
            "Currently greeted NPCs:",
            Array.from(this.greetedNPCs || [])
        );

        if (!this.greetedNPCs) {
            console.log("Creating missing greetedNPCs Set");
            this.greetedNPCs = new Set();
            return false;
        }

        const allGreeted = npcsToGreet.every((npc) =>
            this.greetedNPCs.has(npc)
        );

        if (allGreeted) {
            console.log("✓ ALL REQUIRED NPCS HAVE BEEN GREETED!");

            if (this.triggerQuestEvent) {
                this.triggerQuestEvent("npc:allGreeted");
                console.log("✓ Triggered 'npc:allGreeted' event");

                if (this.alertPrefab) {
                    this.alertPrefab.alert("Quest Completed: Good Invitation");
                }
            } else {
                console.warn(
                    "❌ No triggerQuestEvent function found on scene!"
                );
            }

            this.updateGreetingCounter();

            this.time.delayedCall(3000, () => {
                this.updateGreetingCounterVisibility();
            });
        }

        return allGreeted;
    };

    scene.markNPCGreeted = function (npcName) {
        console.log(`Attempting to mark NPC '${npcName}' as greeted`);

        if (!npcsToGreet.includes(npcName)) {
            console.warn(
                `Attempted to mark NPC '${npcName}' as greeted - not in required list.`
            );
            return false;
        }

        if (!this.greetedNPCs) {
            this.greetedNPCs = new Set();
            console.log("Created missing greetedNPCs Set");
        }

        this.greetedNPCs.add(npcName);
        console.log(`✓ Marked NPC '${npcName}' as greeted`);
        console.log(
            `Current progress: ${this.greetedNPCs.size}/${npcsToGreet.length}`
        );

        if (this.alertPrefab) {
            this.alertPrefab.alert(
                `Greeted ${npcName} (${this.greetedNPCs.size}/${npcsToGreet.length})`
            );
        }

        this.updateGreetingCounter();

        const allGreeted = this.checkAllNPCsGreeted();

        return allGreeted;
    };

    scene.createDebugButton = function () {
        const debugBtn = this.add
            .rectangle(
                this.game.config.width - 100,
                this.game.config.height - 50,
                150,
                40,
                0xff0000,
                0.7
            )
            .setScrollFactor(0)
            .setDepth(200)
            .setInteractive();

        const debugText = this.add
            .text(
                this.game.config.width - 100,
                this.game.config.height - 50,
                "Debug Quest #003",
                {
                    fontFamily: "Arial",
                    fontSize: "12px",
                    color: "#ffffff",
                }
            )
            .setScrollFactor(0)
            .setDepth(201)
            .setOrigin(0.5);

        debugBtn.on("pointerdown", () => {
            console.log("=== DEBUG QUEST #003 ===");
            console.log(
                "Currently greeted NPCs:",
                Array.from(this.greetedNPCs || [])
            );

            // Add a menu of options
            const menuBg = this.add
                .rectangle(
                    this.game.config.width / 2,
                    this.game.config.height / 2,
                    300,
                    250,
                    0x000000,
                    0.9
                )
                .setScrollFactor(0)
                .setDepth(300);

            const menuTitle = this.add
                .text(
                    this.game.config.width / 2,
                    this.game.config.height / 2 - 100,
                    "DEBUG QUEST #003",
                    {
                        fontFamily: "Arial",
                        fontSize: "16px",
                        color: "#ffffff",
                        fontWeight: "bold",
                    }
                )
                .setScrollFactor(0)
                .setDepth(301)
                .setOrigin(0.5);

            npcsToGreet.forEach((npc, index) => {
                const npcBtn = this.add
                    .rectangle(
                        this.game.config.width / 2,
                        this.game.config.height / 2 - 50 + index * 40,
                        200,
                        30,
                        0x444444,
                        0.9
                    )
                    .setScrollFactor(0)
                    .setDepth(301)
                    .setInteractive();

                const npcText = this.add
                    .text(
                        this.game.config.width / 2,
                        this.game.config.height / 2 - 50 + index * 40,
                        `Mark ${npc} as greeted`,
                        {
                            fontFamily: "Arial",
                            fontSize: "12px",
                            color: "#ffffff",
                        }
                    )
                    .setScrollFactor(0)
                    .setDepth(302)
                    .setOrigin(0.5);

                npcBtn.on("pointerdown", () => {
                    this.markNPCGreeted(npc);
                    npcBtn.fillColor = 0x00aa00;
                });
            });

            const forceBtn = this.add
                .rectangle(
                    this.game.config.width / 2,
                    this.game.config.height / 2 + 50,
                    200,
                    30,
                    0x008800,
                    0.9
                )
                .setScrollFactor(0)
                .setDepth(301)
                .setInteractive();

            const forceText = this.add
                .text(
                    this.game.config.width / 2,
                    this.game.config.height / 2 + 50,
                    "Force Complete Quest",
                    {
                        fontFamily: "Arial",
                        fontSize: "12px",
                        color: "#ffffff",
                    }
                )
                .setScrollFactor(0)
                .setDepth(302)
                .setOrigin(0.5);

            forceBtn.on("pointerdown", () => {
                npcsToGreet.forEach((npc) => {
                    this.greetedNPCs.add(npc);
                });
                this.updateGreetingCounter();
                this.checkAllNPCsGreeted();
            });

            const closeBtn = this.add
                .rectangle(
                    this.game.config.width / 2,
                    this.game.config.height / 2 + 100,
                    200,
                    30,
                    0xaa0000,
                    0.9
                )
                .setScrollFactor(0)
                .setDepth(301)
                .setInteractive();

            const closeText = this.add
                .text(
                    this.game.config.width / 2,
                    this.game.config.height / 2 + 100,
                    "Close Debug Menu",
                    {
                        fontFamily: "Arial",
                        fontSize: "12px",
                        color: "#ffffff",
                    }
                )
                .setScrollFactor(0)
                .setDepth(302)
                .setOrigin(0.5);

            closeBtn.on("pointerdown", () => {
                this.children.list
                    .filter((child) => child.depth >= 300 && child.depth <= 302)
                    .forEach((child) => child.destroy());
            });
        });

        return debugBtn;
    };

    const initGreetingSystem = function () {
        const questSystem = scene.questSystem || window.questSystem;

        if (questSystem && questSystem.isQuestActive("003")) {
            console.log("Quest #003 is active, initializing greeting counter");
            scene.createGreetingCounter();
            scene.updateGreetingCounter();
        } else {
            console.log("Quest #003 is not active yet");
        }

        scene.createDebugButton();
    };

    scene.events.on("quest:activated", ({ questId }) => {
        if (questId === "003") {
            console.log("Quest #003 activated!");
            scene.createGreetingCounter();
            scene.updateGreetingCounter();
        }
    });

    scene.events.on("quest:completed", ({ questId }) => {
        if (questId === "003") {
            console.log("Quest #003 completed!");
            scene.updateGreetingCounterVisibility();
        }
    });

    initGreetingSystem();

    return {
        markNPCGreeted: (npcName) => scene.markNPCGreeted(npcName),
        checkAllNPCsGreeted: () => scene.checkAllNPCsGreeted(),
        getGreetedNPCs: () => Array.from(scene.greetedNPCs || []),
        getRequiredNPCs: () => [...npcsToGreet],
    };
}

export function setupDirectNPCGreetingHooks(scene) {
    console.log("Setting up direct NPC greeting hooks");

    const hookNPCGreeting = (npcObject, npcName) => {
        if (!npcObject) return;

        const events = npcObject.listeners("pointerdown");

        if (events && events.length > 0) {
            console.log(
                `NPC ${npcName} already has pointerdown events, adding greeting hook`
            );

            const originalHandler = events[0];

            npcObject.off("pointerdown", originalHandler);

            npcObject.on("pointerdown", function (pointer) {
                if (scene.markNPCGreeted) {
                    console.log(`Direct hook: Marking ${npcName} as greeted`);
                    scene.markNPCGreeted(npcName);
                }

                originalHandler.call(this, pointer);
            });
        } else {
            console.log(
                `NPC ${npcName} has no pointerdown events, adding simple greeting`
            );

            npcObject.on("pointerdown", function () {
                if (scene.markNPCGreeted) {
                    console.log(`Simple hook: Marking ${npcName} as greeted`);
                    scene.markNPCGreeted(npcName);
                }
            });
        }
    };
    if (scene.children && scene.children.list) {
        const npcs = {
            Victoria: ["NPCVictoria", "npcVictoria", "victoriaContainer"],
            Lily: ["NPCLily", "npcLily", "foodMerchant", "lilyContainer"],
            Rowan: [
                "NPCRowan",
                "npcRowan",
                "blackSmith",
                "blackSmithContainer",
            ],
            Lydia: ["NPCLydia", "npcLydia", "merchant", "merchantContainer"],
        };

        scene.children.list.forEach((child) => {
            Object.entries(npcs).forEach(([npcName, possibleKeys]) => {
                if (
                    possibleKeys.some(
                        (key) =>
                            child.name === key ||
                            (child.texture && child.texture.key === key) ||
                            (typeof child.name === "string" &&
                                child.name.includes(npcName))
                    )
                ) {
                    console.log(
                        `Found ${npcName} NPC, setting up direct greeting hook`
                    );

                    if (child.type === "Container") {
                        if (child.npc && child.npc.setInteractive) {
                            hookNPCGreeting(child.npc, npcName);
                        } else if (child.list && child.list.length > 0) {
                            const interactiveChild = child.list.find(
                                (c) => c.setInteractive
                            );
                            if (interactiveChild) {
                                hookNPCGreeting(interactiveChild, npcName);
                            }
                        }
                    } else if (child.setInteractive) {
                        hookNPCGreeting(child, npcName);
                    }
                }
            });
        });
    }

    return true;
}

export function extendHarvestPrefab(HarvestPrefab) {
    const originalChangeState = HarvestPrefab.prototype.changeState;

    HarvestPrefab.prototype.changeState = function () {
        const prevState = this.state;

        originalChangeState.call(this);

        if (prevState !== this.state) {
            switch (this.state) {
                case "GROUND":
                    if (prevState === "ROCK") {
                        this.scene.triggerQuestEvent("harvest:rockRemoved", {
                            harvest: this,
                        });
                    }
                    break;
                case "SOIL":
                    if (prevState === "GROUND") {
                        this.scene.triggerQuestEvent("harvest:groundHoed", {
                            harvest: this,
                        });
                    }
                    break;
                case "PLANTED":
                    this.scene.triggerQuestEvent("harvest:seedPlanted", {
                        seed: this.seed,
                        harvest: this,
                    });
                    break;
                case "WATERED":
                    this.scene.triggerQuestEvent("harvest:cropWatered", {
                        seed: this.seed,
                        harvest: this,
                    });
                    break;
            }
        }
    };

    const originalPrefabCreateCycle = HarvestPrefab.prototype.prefabCreateCycle;

    HarvestPrefab.prototype.prefabCreateCycle = function () {
        originalPrefabCreateCycle.call(this);

        const originalPointerDown = this.listeners("pointerdown")[0];

        if (originalPointerDown) {
            this.off("pointerdown", originalPointerDown);

            this.on(
                "pointerdown",
                function (_pointer) {
                    if (this.isReadyForHarvest) {
                        const cropType = this.seed;

                        originalPointerDown.call(this, _pointer);

                        if (this.scene.triggerQuestEvent) {
                            this.scene.triggerQuestEvent(
                                "harvest:cropHarvested",
                                { crop: cropType, harvest: this }
                            );
                        }
                        return;
                    }

                    originalPointerDown.call(this, _pointer);
                },
                this
            );
        }
    };

    return HarvestPrefab;
}

export function extendJackNpc(OldManJackNpcPrefab) {
    const originalPrefabCreateCycle =
        OldManJackNpcPrefab.prototype.prefabCreateCycle;

    OldManJackNpcPrefab.prototype.prefabCreateCycle = function () {
        originalPrefabCreateCycle.call(this);

        if (this.npc) {
            const originalPointerDown = this.npc.listeners("pointerdown")[0];

            if (originalPointerDown) {
                this.npc.off("pointerdown", originalPointerDown);

                this.npc.on(
                    "pointerdown",
                    async function (_pointer) {
                        if (this.scene.triggerQuestEvent) {
                            this.scene.triggerQuestEvent(
                                "npc:jackInteraction",
                                { npc: this }
                            );
                        }

                        if (
                            this.scene.markNPCGreeted &&
                            this.scene.questSystem
                        ) {
                            if (this.scene.questSystem.isQuestActive("003")) {
                                this.scene.markNPCGreeted("Jack");
                            }
                        }

                        await originalPointerDown.call(this, _pointer);
                    },
                    this
                );
            }
        }
    };

    return OldManJackNpcPrefab;
}
export function setupBeachDetection(scene) {
    console.log("Setting up beach detection for quest progress");

    const beachZone = scene.add.zone(
        scene.beachCenterX || 800,
        scene.beachCenterY || 700,
        scene.beachWidth || 500,
        scene.beachHeight || 300
    );

    scene.physics.world.enable(beachZone);
    beachZone.body.setAllowGravity(false);
    beachZone.body.moves = false;

    scene.physics.add.overlap(
        scene.playerPrefab,
        beachZone,
        () => {
            if (!scene.playerEnteredBeach) {
                scene.playerEnteredBeach = true;

                if (scene.triggerQuestEvent) {
                    console.log(
                        "Player entered beach - triggering quest event"
                    );
                    scene.triggerQuestEvent("player:enteredBeach");
                } else {
                    console.warn("triggerQuestEvent not available on scene");
                }
            }
        },
        null,
        scene
    );

    return beachZone;
}

export function setupSeashellCollectibles(scene) {
    console.log("Setting up seashell collectibles for Quest #007");

    scene.seashells = scene.physics.add.group();

    const seashellPositions = [
        { x: 750, y: 650 },
        { x: 820, y: 700 },
        { x: 880, y: 710 },
        { x: 800, y: 750 },
        { x: 750, y: 780 },
        { x: 900, y: 650 },
        { x: 950, y: 700 },
    ];

    const shuffledPositions = seashellPositions.sort(() => Math.random() - 0.5);
    const selectedPositions = shuffledPositions.slice(0, 5); // Take 5 random positions

    selectedPositions.forEach((pos) => {
        const seashell = scene.seashells.create(pos.x, pos.y, "seashell");
        seashell.setInteractive();

        seashell.on("pointerdown", function () {
            console.log("Seashell collected");

            this.setTint(0xffff00);
            scene.tweens.add({
                targets: this,
                y: this.y - 50,
                alpha: 0,
                duration: 800,
                onComplete: () => {
                    this.destroy();

                    scene.triggerQuestEvent("item:seashellCollected", {
                        x: pos.x,
                        y: pos.y,
                    });
                },
            });
        });
    });

    if (scene.questSystem) {
        if (
            !scene.questSystem.isQuestActive("007") ||
            !scene.questSystem.quests["007"].subtasks["007-2"].completed
        ) {
            scene.seashells.setVisible(false);
        }

        scene.events.on("quest:updated", ({ questId, subtaskId }) => {
            if (questId === "007" && subtaskId === "007-2") {
                scene.seashells.setVisible(true);
            }
        });
    }

    return scene.seashells;
}

export function extendLydiaNpc(LydiaNpcPrefab) {
    const originalPrefabCreateCycle =
        LydiaNpcPrefab.prototype.prefabCreateCycle;

    LydiaNpcPrefab.prototype.prefabCreateCycle = function () {
        originalPrefabCreateCycle.call(this);

        if (this.npc) {
            const originalPointerDown = this.npc.listeners("pointerdown")[0];

            if (originalPointerDown) {
                this.npc.off("pointerdown", originalPointerDown);

                this.npc.on(
                    "pointerdown",
                    async function (_pointer) {
                        const questSystem =
                            this.scene.questSystem || window.questSystem;

                        if (this.scene.triggerQuestEvent) {
                            this.scene.triggerQuestEvent(
                                "npc:lydiaInteraction",
                                { npc: this }
                            );
                        }

                        if (
                            questSystem &&
                            questSystem.isQuestCompleted("002")
                        ) {
                            if (
                                !questSystem.isQuestActive("007") &&
                                !questSystem.isQuestCompleted("007")
                            ) {
                                this.scene.triggerQuestEvent(
                                    "npc:lydiaSeashellQuest",
                                    { npc: this }
                                );
                            }
                            else if (
                                questSystem.isQuestActive("007") &&
                                questSystem.quests["007"].subtasks["007-3"]
                                    .completed &&
                                !questSystem.quests["007"].subtasks["007-4"]
                                    .completed
                            ) {
                                this.scene.triggerQuestEvent(
                                    "npc:lydiaSeashellDelivery",
                                    { npc: this }
                                );
                            }
                        }

                        if (this.scene.markNPCGreeted && questSystem) {
                            if (questSystem.isQuestActive("003")) {
                                this.scene.markNPCGreeted("Lydia");
                            }
                        }

                        await originalPointerDown.call(this, _pointer);
                    },
                    this
                );
            }
        }
    };

    return LydiaNpcPrefab;
}

export function extendLilyNpc(LilyNpcPrefab) {
    const originalPrefabCreateCycle = LilyNpcPrefab.prototype.prefabCreateCycle;

    LilyNpcPrefab.prototype.prefabCreateCycle = function () {
        originalPrefabCreateCycle.call(this);

        if (this.npc) {
            const originalPointerDown = this.npc.listeners("pointerdown")[0];

            if (originalPointerDown) {
                this.npc.off("pointerdown", originalPointerDown);

                this.npc.on(
                    "pointerdown",
                    async function (_pointer) {
                        const questSystem =
                            this.scene.questSystem || window.questSystem;

                        if (
                            questSystem &&
                            questSystem.isQuestCompleted("002")
                        ) {
                            if (
                                !questSystem.isQuestActive("008") &&
                                !questSystem.isQuestCompleted("008")
                            ) {
                                this.scene.triggerQuestEvent(
                                    "npc:lilyRecipeQuest",
                                    { npc: this }
                                );
                            }
                        }

                        if (this.scene.markNPCGreeted && questSystem) {
                            if (questSystem.isQuestActive("003")) {
                                this.scene.markNPCGreeted("Lily");
                            }
                        }

                        await originalPointerDown.call(this, _pointer);
                    },
                    this
                );
            }
        }
    };

    return LilyNpcPrefab;
}

export function setupCookingSystem(scene) {
    console.log("Setting up cooking system for Quest #008");

    scene.cookRecipe = function (recipeName, ingredients) {
        console.log(`Cooking ${recipeName} with ingredients:`, ingredients);

        if (!recipeName) return false;

        let success = false;

        if (recipeName.toLowerCase() === "carrot soup") {
            const hasCarrots = ingredients.some(
                (i) => i.toLowerCase().includes("carrot") || i === "CARROT"
            );

            if (hasCarrots) {
                success = true;
                console.log("Successfully cooked Carrot Soup!");

                this.triggerQuestEvent("cooking:recipeCooked", {
                    recipeName: "Carrot Soup",
                    success: true,
                });

                if (this.alertPrefab) {
                    this.alertPrefab.alert("Cooked: Carrot Soup");
                }
            }
        }

        return success;
    };

    scene.showCookingUI = function () {
        console.log("Showing cooking UI");

        // Create simple cooking UI
        const uiBg = this.add
            .rectangle(
                this.game.config.width / 2,
                this.game.config.height / 2,
                400,
                300,
                0x000000,
                0.8
            )
            .setScrollFactor(0)
            .setDepth(900);

        const uiTitle = this.add
            .text(
                this.game.config.width / 2,
                this.game.config.height / 2 - 120,
                "COOKING",
                {
                    fontFamily: "Arial",
                    fontSize: "24px",
                    color: "#ffffff",
                    fontWeight: "bold",
                }
            )
            .setScrollFactor(0)
            .setDepth(901)
            .setOrigin(0.5);

        const recipeBtn = this.add
            .rectangle(
                this.game.config.width / 2,
                this.game.config.height / 2 - 50,
                300,
                40,
                0x444444,
                0.9
            )
            .setScrollFactor(0)
            .setDepth(901)
            .setInteractive();

        const recipeText = this.add
            .text(
                this.game.config.width / 2,
                this.game.config.height / 2 - 50,
                "Cook Carrot Soup",
                {
                    fontFamily: "Arial",
                    fontSize: "16px",
                    color: "#ffffff",
                }
            )
            .setScrollFactor(0)
            .setDepth(902)
            .setOrigin(0.5);

        if (!this.receivedCarrotSoupRecipe) {
            recipeBtn.setFillStyle(0x222222);
            recipeText.setColor("#888888");
            recipeText.setText("Cook Carrot Soup (Recipe Needed)");
        }

        recipeBtn.on("pointerdown", () => {
            if (this.receivedCarrotSoupRecipe) {
                this.cookRecipe("Carrot Soup", ["CARROT"]);
                recipeBtn.setFillStyle(0x008800);
            }
        });

        const closeBtn = this.add
            .rectangle(
                this.game.config.width / 2,
                this.game.config.height / 2 + 100,
                200,
                40,
                0xaa0000,
                0.9
            )
            .setScrollFactor(0)
            .setDepth(901)
            .setInteractive();

        const closeText = this.add
            .text(
                this.game.config.width / 2,
                this.game.config.height / 2 + 100,
                "Close",
                {
                    fontFamily: "Arial",
                    fontSize: "16px",
                    color: "#ffffff",
                }
            )
            .setScrollFactor(0)
            .setDepth(902)
            .setOrigin(0.5);

        closeBtn.on("pointerdown", () => {
            // Remove all UI elements
            uiBg.destroy();
            uiTitle.destroy();
            recipeBtn.destroy();
            recipeText.destroy();
            closeBtn.destroy();
            closeText.destroy();
        });
    };
    const cookingBtn = scene.add
        .rectangle(scene.game.config.width - 100, 50, 150, 40, 0x8b4513, 0.9)
        .setScrollFactor(0)
        .setDepth(100)
        .setInteractive();

    const cookingText = scene.add
        .text(scene.game.config.width - 100, 50, "Cooking", {
            fontFamily: "Arial",
            fontSize: "16px",
            color: "#ffffff",
        })
        .setScrollFactor(0)
        .setDepth(101)
        .setOrigin(0.5);

    cookingBtn.on("pointerdown", () => {
        scene.showCookingUI();
    });

    return {
        cookRecipe: scene.cookRecipe.bind(scene),
        showCookingUI: scene.showCookingUI.bind(scene),
    };
}

export function extendJackNpcForCarrots(jackNpc) {
    if (jackNpc.handleCarrotGift) {
        return jackNpc;
    }

    jackNpc.handleCarrotGift = function (carrotCount) {
        console.log(`Jack received ${carrotCount} carrots!`);

        if (this.scene.triggerQuestEvent) {
            this.scene.triggerQuestEvent("harvest:carrotsGivenToJack", {
                npc: this,
                carrotCount: carrotCount,
            });
        }

        return true;
    };

    if (typeof jackNpc === "function") {
        const OldManJackNpcPrefab = jackNpc;
        const originalPrefabCreateCycle =
            OldManJackNpcPrefab.prototype.prefabCreateCycle;

        OldManJackNpcPrefab.prototype.prefabCreateCycle = function () {
            originalPrefabCreateCycle.call(this);

            if (this.npc) {
                this.npc.handleCarrotGift = this.handleCarrotGift.bind(this);
            }
        };

        return OldManJackNpcPrefab;
    }

    return jackNpc;
}
export function setupItemGiftSystem(scene) {
    console.log("Setting up item gift system for Quest #012");

    scene.showGiftDialog = function (npc) {
        console.log(`Showing gift dialog for ${npc.name || "NPC"}`);
        const uiBg = this.add
            .rectangle(
                this.game.config.width / 2,
                this.game.config.height / 2,
                400,
                300,
                0x000000,
                0.8
            )
            .setScrollFactor(0)
            .setDepth(900);

        const uiTitle = this.add
            .text(
                this.game.config.width / 2,
                this.game.config.height / 2 - 120,
                `Give items to ${npc.name || "NPC"}`,
                {
                    fontFamily: "Arial",
                    fontSize: "20px",
                    color: "#ffffff",
                }
            )
            .setScrollFactor(0)
            .setDepth(901)
            .setOrigin(0.5);

        const items = [
            { name: "Carrot", count: 5, id: "CARROT" },
            { name: "Apple", count: 3, id: "APPLE" },
            { name: "Fish", count: 2, id: "FISH" },
        ];

        items.forEach((item, index) => {
            const itemBtn = this.add
                .rectangle(
                    this.game.config.width / 2,
                    this.game.config.height / 2 - 70 + index * 50,
                    300,
                    40,
                    0x444444,
                    0.9
                )
                .setScrollFactor(0)
                .setDepth(901)
                .setInteractive();

            const itemText = this.add
                .text(
                    this.game.config.width / 2,
                    this.game.config.height / 2 - 70 + index * 50,
                    `${item.name} (${item.count})`,
                    {
                        fontFamily: "Arial",
                        fontSize: "16px",
                        color: "#ffffff",
                    }
                )
                .setScrollFactor(0)
                .setDepth(902)
                .setOrigin(0.5);

            itemBtn.on("pointerdown", () => {
                console.log(`Giving ${item.name} to NPC`);

                if (item.id === "CARROT" && npc.handleCarrotGift) {
                    npc.handleCarrotGift(item.count);
                    itemBtn.setFillStyle(0x008800);

                    items[index].count = 0;
                    itemText.setText(`${item.name} (${items[index].count})`);
                }
            });
        });

        // Close button
        const closeBtn = this.add
            .rectangle(
                this.game.config.width / 2,
                this.game.config.height / 2 + 100,
                200,
                40,
                0xaa0000,
                0.9
            )
            .setScrollFactor(0)
            .setDepth(901)
            .setInteractive();

        const closeText = this.add
            .text(
                this.game.config.width / 2,
                this.game.config.height / 2 + 100,
                "Close",
                {
                    fontFamily: "Arial",
                    fontSize: "16px",
                    color: "#ffffff",
                }
            )
            .setScrollFactor(0)
            .setDepth(902)
            .setOrigin(0.5);

        closeBtn.on("pointerdown", () => {
            this.children.list
                .filter((child) => child.depth >= 900 && child.depth <= 902)
                .forEach((child) => child.destroy());
        });
    };

    return scene.showGiftDialog.bind(scene);
}
