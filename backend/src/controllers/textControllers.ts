import { Response, Request } from "express"
import pool from "../database/pool";

export const getWordDefinition = async (req: Request, res: Response) => {
    console.log("env: ", process.env.DB_HOST)
    const result = await pool.query('SELECT NOW()');
    console.log(result.rows);
    const id = parseInt(req.params.id, 10)
    if (isNaN(id) || id < 0) {
        res.status(400).send("Invalid ID")
    }
    const listId = id % 102
    const definition = definitions[listId]
    res.status(200).send(
        definition.word +
            ": " +
            definition.definition +
            " - " +
            definition.sentence
    )
}

const definitions = [
    {
        word: "revere",
        definition: "to very much respect and admire someone or something",
        sentence: "The students revere their teacher.",
    },
    {
        word: "abhor",
        definition:
            "to hate a way of behaving or thinking, often because you think it is immoral",
        sentence: "I abhor all forms of racism.",
    },
    {
        word: "acquiesce",
        definition: "to accept or agree to something, often reluctantly",
        sentence: "After much debate, she finally acquiesced to their demands.",
    },
    {
        word: "banal",
        definition: "lacking originality, freshness, or novelty; commonplace",
        sentence: "The critic dismissed the film as banal and predictable.",
    },
    {
        word: "circumvent",
        definition:
            "to find a way around an obstacle or difficulty, typically in a clever or resourceful manner",
        sentence:
            "They circumvented the regulations by filing the paperwork in a different jurisdiction.",
    },
    {
        word: "denigrate",
        definition:
            "to criticize unfairly or to disparage the character of someone",
        sentence:
            "The politician's speech denigrated his opponents rather than addressing the issues.",
    },
    {
        word: "ephemeral",
        definition: "lasting for a very short time",
        sentence:
            "The beauty of cherry blossoms is ephemeral, lasting only a few days each spring.",
    },
    {
        word: "fastidious",
        definition: "very attentive to and concerned about accuracy and detail",
        sentence:
            "He is fastidious about keeping his workspace organized and clean.",
    },
    {
        word: "garrulous",
        definition: "excessively talkative, especially on trivial matters",
        sentence:
            "The garrulous tour guide barely paused for breath during the two-hour excursion.",
    },
    {
        word: "harangue",
        definition: "a lengthy and aggressive speech or lecture",
        sentence:
            "The professor delivered a harangue about the importance of academic integrity.",
    },
    {
        word: "inculcate",
        definition:
            "to instill an idea, attitude, or habit by persistent instruction",
        sentence:
            "Parents try to inculcate good values in their children from an early age.",
    },
    {
        word: "juxtapose",
        definition:
            "to place or deal with close together for contrasting effect",
        sentence:
            "The documentary juxtaposed scenes of extreme wealth with those of abject poverty.",
    },
    {
        word: "laconic",
        definition:
            "using very few words; concise to the point of seeming rude or mysterious",
        sentence:
            "His laconic response of 'maybe' left us wondering what he really thought.",
    },
    {
        word: "maudlin",
        definition:
            "self-pityingly or tearfully sentimental, often through drunkenness",
        sentence:
            "After a few drinks, he became maudlin about his failed relationships.",
    },
    {
        word: "nebulous",
        definition: "in the form of a cloud or haze; vague or ill-defined",
        sentence:
            "Their plans for the future remained nebulous, with no specific details or timeline.",
    },
    {
        word: "obfuscate",
        definition: "to render obscure, unclear, or unintelligible",
        sentence:
            "The politician tried to obfuscate the issue by using technical jargon.",
    },
    {
        word: "pernicious",
        definition:
            "having a harmful effect, especially in a gradual or subtle way",
        sentence:
            "The pernicious influence of misinformation can erode public trust in institutions.",
    },
    {
        word: "quixotic",
        definition: "exceedingly idealistic; unrealistic and impractical",
        sentence:
            "His quixotic plan to solve world hunger in a year was admirable but unrealistic.",
    },
    {
        word: "recalcitrant",
        definition:
            "having an obstinately uncooperative attitude toward authority or discipline",
        sentence:
            "The recalcitrant student refused to follow classroom rules despite multiple warnings.",
    },
    {
        word: "sycophant",
        definition:
            "a person who acts obsequiously toward someone important in order to gain advantage",
        sentence:
            "The CEO surrounded himself with sycophants who never challenged his decisions.",
    },
    {
        word: "truculent",
        definition: "eager or quick to argue or fight; aggressively defiant",
        sentence:
            "The truculent teenager responded with hostility to even the simplest request.",
    },
    {
        word: "ubiquitous",
        definition: "present, appearing, or found everywhere",
        sentence: "Smartphones have become ubiquitous in modern society.",
    },
    {
        word: "vacillate",
        definition:
            "to waver between different opinions or actions; be indecisive",
        sentence:
            "She vacillated between accepting the job offer and pursuing further education.",
    },
    {
        word: "zealot",
        definition:
            "a person who is fanatical and uncompromising in pursuit of their ideals",
        sentence:
            "The political zealot refused to consider any opposing viewpoints.",
    },
    {
        word: "ameliorate",
        definition: "to make something bad or unsatisfactory better",
        sentence:
            "The new policies were designed to ameliorate working conditions in factories.",
    },
    {
        word: "bellicose",
        definition: "demonstrating aggression and willingness to fight",
        sentence:
            "His bellicose attitude toward neighboring countries alarmed international observers.",
    },
    {
        word: "capricious",
        definition:
            "given to sudden and unaccountable changes of mood or behavior",
        sentence:
            "Her capricious decision-making made it difficult for her team to plan ahead.",
    },
    {
        word: "deleterious",
        definition: "causing harm or damage",
        sentence:
            "Smoking has deleterious effects on nearly every organ in the body.",
    },
    {
        word: "equivocate",
        definition:
            "to use ambiguous language to conceal the truth or avoid committing oneself",
        sentence: "When pressed for details, the witness began to equivocate.",
    },
    {
        word: "fervid",
        definition: "intensely passionate or enthusiastic",
        sentence:
            "The candidate delivered a fervid speech that energized the crowd.",
    },
    {
        word: "gregarious",
        definition: "fond of company; sociable",
        sentence:
            "Despite being twins, one was gregarious while the other was more reserved.",
    },
    {
        word: "hackneyed",
        definition: "lacking significance through having been overused; trite",
        sentence:
            "The movie relied on hackneyed plot devices that audiences had seen countless times before.",
    },
    {
        word: "impecunious",
        definition: "having little or no money",
        sentence:
            "As impecunious students, they found creative ways to enjoy the city on a budget.",
    },
    {
        word: "jettison",
        definition: "to throw or drop something from an aircraft or ship",
        sentence:
            "The pilot had to jettison fuel before making the emergency landing.",
    },
    {
        word: "kowtow",
        definition: "to act in an excessively subservient manner",
        sentence:
            "She refused to kowtow to the demands of her unreasonable boss.",
    },
    {
        word: "loquacious",
        definition: "tending to talk a great deal; garrulous",
        sentence:
            "The loquacious host barely let his guests get a word in during the interview.",
    },
    {
        word: "magnanimous",
        definition:
            "very generous or forgiving, especially toward a rival or less powerful person",
        sentence:
            "In victory, she was magnanimous toward her defeated opponent.",
    },
    {
        word: "nefarious",
        definition: "extremely wicked or villainous",
        sentence:
            "The detective worked tirelessly to uncover the businessman's nefarious activities.",
    },
    {
        word: "obstreperous",
        definition: "noisy and difficult to control",
        sentence:
            "The teacher struggled to quiet the obstreperous class after recess.",
    },
    {
        word: "parsimonious",
        definition: "unwilling to spend money or resources; stingy",
        sentence:
            "Despite his wealth, he was known for being parsimonious when it came to tipping.",
    },
    {
        word: "querulous",
        definition: "complaining in a petulant or whining manner",
        sentence: "The querulous patient demanded to see a different doctor.",
    },
    {
        word: "reticent",
        definition: "not revealing one's thoughts or feelings readily",
        sentence: "He was reticent about his past experiences in the military.",
    },
    {
        word: "surreptitious",
        definition:
            "kept secret, especially because it would not be approved of",
        sentence:
            "She took a surreptitious glance at her competitor's notes when no one was looking.",
    },
    {
        word: "tenacious",
        definition:
            "tending to keep a firm hold of something; clinging or adhering closely",
        sentence:
            "Her tenacious pursuit of justice finally led to reforms in the system.",
    },
    {
        word: "usurp",
        definition:
            "to take a position of power or importance illegally or by force",
        sentence:
            "The general attempted to usurp the throne after the king's death.",
    },
    {
        word: "vexatious",
        definition:
            "causing or tending to cause annoyance, frustration, or worry",
        sentence:
            "Dealing with vexatious legal claims consumed much of the company's resources.",
    },
    {
        word: "wanton",
        definition: "deliberate and unprovoked; malicious",
        sentence:
            "The report documented the wanton destruction of cultural heritage sites during the conflict.",
    },
    {
        word: "xenophobic",
        definition:
            "having or showing a dislike of or prejudice against people from other countries",
        sentence: "The politician's xenophobic rhetoric alienated many voters.",
    },
    {
        word: "yearn",
        definition: "to have an intense feeling of longing for something",
        sentence:
            "Living in the city, she yearned for the peace and quiet of her rural hometown.",
    },
    {
        word: "zeitgeist",
        definition:
            "the defining spirit or mood of a particular period of history",
        sentence:
            "His novels perfectly captured the zeitgeist of 1920s America.",
    },
    {
        word: "acerbic",
        definition:
            "sharp and forthright in manner or speech; bitter in taste or tone",
        sentence:
            "The food critic was known for his acerbic reviews of pretentious restaurants.",
    },
    {
        word: "byzantine",
        definition:
            "excessively complicated, typically involving a great deal of administrative detail",
        sentence:
            "Navigating the byzantine bureaucracy required patience and persistence.",
    },
    {
        word: "cacophony",
        definition: "a harsh, discordant mixture of sounds",
        sentence:
            "The cacophony of car horns and construction noise made it impossible to concentrate.",
    },
    {
        word: "diaphanous",
        definition: "light, delicate, and translucent",
        sentence:
            "The bride wore a diaphanous veil that caught the sunlight beautifully.",
    },
    {
        word: "ersatz",
        definition: "made or used as a substitute, typically an inferior one",
        sentence:
            "During the war, they had to make do with ersatz coffee made from roasted grains.",
    },
    {
        word: "facetious",
        definition:
            "treating serious issues with deliberately inappropriate humor",
        sentence:
            "His facetious comments about the budget crisis were not well-received at the meeting.",
    },
    {
        word: "germane",
        definition: "relevant to a subject under consideration",
        sentence:
            "The lawyer objected that the witness's testimony was not germane to the case.",
    },
    {
        word: "hebetude",
        definition: "the state of being dull or lethargic",
        sentence: "After lunch, a sense of hebetude settled over the office.",
    },
    {
        word: "insidious",
        definition:
            "proceeding in a gradual, subtle way, but with harmful effects",
        sentence:
            "The insidious spread of misinformation through social media is difficult to combat.",
    },
    {
        word: "jejune",
        definition: "naive, simplistic, and lacking in substance",
        sentence:
            "The professor dismissed the student's analysis as jejune and underdeveloped.",
    },
    {
        word: "kerfuffle",
        definition:
            "a commotion or fuss, especially one caused by conflicting views",
        sentence:
            "There was quite a kerfuffle when two guests arrived wearing identical outfits.",
    },
    {
        word: "largesse",
        definition: "generosity in bestowing money or gifts upon others",
        sentence:
            "The foundation's largesse has funded numerous educational initiatives.",
    },
    {
        word: "mellifluous",
        definition: "sweet or musical; pleasant to hear",
        sentence:
            "The narrator's mellifluous voice made the audiobook a pleasure to listen to.",
    },
    {
        word: "noisome",
        definition: "having an extremely offensive smell; disgusting",
        sentence:
            "The noisome odor from the garbage dump permeated the surrounding neighborhood.",
    },
    {
        word: "opulent",
        definition: "ostentatiously rich and luxurious or lavish",
        sentence:
            "The palace's opulent interior featured gold leaf accents and crystal chandeliers.",
    },
    {
        word: "perfunctory",
        definition: "carried out with minimal effort or reflection",
        sentence:
            "He gave the document a perfunctory glance before signing it.",
    },
    {
        word: "quintessential",
        definition:
            "representing the most perfect or typical example of a quality or class",
        sentence:
            "The small town bakery is the quintessential family-owned business.",
    },
    {
        word: "recondite",
        definition: "little known; abstruse",
        sentence:
            "His lectures on recondite philosophical concepts attracted only the most dedicated students.",
    },
    {
        word: "sagacious",
        definition:
            "having or showing keen mental discernment and good judgment",
        sentence:
            "The sagacious investor predicted the market crash months before it happened.",
    },
    {
        word: "torpor",
        definition: "a state of physical or mental inactivity; lethargy",
        sentence:
            "The extreme heat induced a state of torpor in the afternoon.",
    },
    {
        word: "unctuous",
        definition: "excessively or ingratiatingly flattering; oily",
        sentence:
            "The salesperson's unctuous manner made customers uncomfortable.",
    },
    {
        word: "vapid",
        definition:
            "offering nothing that is stimulating or challenging; bland",
        sentence:
            "The critic described the sequel as a vapid imitation of the original film.",
    },
    {
        word: "winsome",
        definition: "attractive or appealing in appearance or character",
        sentence: "Her winsome smile charmed everyone she met.",
    },
    {
        word: "xeric",
        definition: "of, relating to, or adapted to a dry environment",
        sentence:
            "The botanical garden featured a collection of xeric plants that thrive with minimal water.",
    },
    {
        word: "yokel",
        definition: "a naive or gullible inhabitant of a rural area",
        sentence:
            "City dwellers often unfairly stereotype rural residents as yokels.",
    },
    {
        word: "zephyr",
        definition: "a gentle, mild breeze",
        sentence: "A welcome zephyr provided relief from the summer heat.",
    },
    {
        word: "altruistic",
        definition:
            "showing a disinterested and selfless concern for the well-being of others",
        sentence:
            "Her altruistic decision to donate a kidney to a stranger inspired many others.",
    },
    {
        word: "bombastic",
        definition: "high-sounding but with little meaning; inflated",
        sentence:
            "The bombastic language in the advertisement made exaggerated claims about the product.",
    },
    {
        word: "concomitant",
        definition: "naturally accompanying or associated",
        sentence:
            "Increased responsibility is a concomitant of promotion to management.",
    },
    {
        word: "dilettante",
        definition:
            "a person who cultivates an area of interest without real commitment or knowledge",
        sentence:
            "Though he played at several instruments, he remained a dilettante rather than mastering any one of them.",
    },
    {
        word: "elucidate",
        definition: "to make clear; to explain",
        sentence:
            "The professor took time to elucidate the more complex concepts for the students.",
    },
    {
        word: "fecund",
        definition: "intellectually productive; fertile",
        sentence:
            "The author's most fecund period resulted in three novels in just two years.",
    },
    {
        word: "grandiloquent",
        definition: "pompous or extravagant in language, style, or manner",
        sentence:
            "The politician's grandiloquent speech failed to address any concrete issues.",
    },
    {
        word: "hegemony",
        definition:
            "leadership or dominance, especially by one country or social group over others",
        sentence:
            "The corporation's hegemony in the tech sector has raised concerns about monopolistic practices.",
    },
    {
        word: "ignominious",
        definition: "deserving or causing public disgrace or shame",
        sentence:
            "The team's ignominious defeat ended their championship hopes.",
    },
    {
        word: "jocular",
        definition: "fond of or characterized by joking; humorous or playful",
        sentence:
            "Despite the serious subject matter, the professor maintained a jocular tone throughout the lecture.",
    },
    {
        word: "kudos",
        definition: "praise and honor received for an achievement",
        sentence:
            "The director received kudos from critics for her innovative approach to the classic play.",
    },
    {
        word: "lugubrious",
        definition: "looking or sounding sad and dismal",
        sentence:
            "The clown's lugubrious expression contrasted with his colorful costume.",
    },
    {
        word: "malfeasance",
        definition: "wrongdoing, especially by a public official",
        sentence:
            "The investigation uncovered evidence of malfeasance in the awarding of government contracts.",
    },
    {
        word: "neologism",
        definition: "a newly coined word or expression",
        sentence:
            "The tech industry regularly produces neologisms that eventually enter common usage.",
    },
    {
        word: "obsequious",
        definition: "obedient or attentive to an excessive or servile degree",
        sentence:
            "The obsequious waiter hovered around the table, refilling water glasses after every sip.",
    },
    {
        word: "palliate",
        definition: "to make less severe or intense without removing the cause",
        sentence:
            "The medication can palliate the symptoms but cannot cure the underlying disease.",
    },
    {
        word: "quotidian",
        definition: "of or occurring every day; ordinary or everyday",
        sentence:
            "The documentary found beauty in the quotidian routines of suburban life.",
    },
    {
        word: "redoubtable",
        definition: "formidable, especially as an opponent",
        sentence: "She faced a redoubtable opponent in the championship match.",
    },
    {
        word: "sardonic",
        definition: "grimly mocking or cynical",
        sentence:
            "He gave a sardonic laugh when told about the company's commitment to work-life balance.",
    },
    {
        word: "temerity",
        definition: "excessive confidence or boldness; audacity",
        sentence:
            "He had the temerity to question the expert's conclusions in front of the entire conference.",
    },
    {
        word: "umbrage",
        definition: "offense or annoyance",
        sentence:
            "She took umbrage at the suggestion that her work was derivative.",
    },
    {
        word: "verisimilitude",
        definition: "the appearance of being true or real",
        sentence:
            "The historical drama was praised for its verisimilitude in depicting 19th-century London.",
    },
    {
        word: "wily",
        definition: "skilled at gaining an advantage, especially deceitfully",
        sentence:
            "The wily negotiator always seemed to get the better end of the deal.",
    },
    {
        word: "xenial",
        definition:
            "of, relating to, or constituting hospitality or relations between host and guest",
        sentence:
            "The small town was known for its xenial attitude toward visitors.",
    },
]
