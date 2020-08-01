--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

-- Started on 2020-07-04 13:17:05

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 16434)
-- Name: CollectionGame; Type: TABLE; Schema: public; Owner: postgres
--

--
-- TOC entry 209 (class 1259 OID 16434)
-- Name: CollectionGame; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CollectionGame" (
    id integer NOT NULL,
    "userColllectionID" bigint NOT NULL,
    "gameID" bigint NOT NULL
);


--
-- TOC entry 208 (class 1259 OID 16432)
-- Name: CollectionGame_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."CollectionGame_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2928 (class 0 OID 0)
-- Dependencies: 208
-- Name: CollectionGame_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."CollectionGame_id_seq" OWNED BY public."CollectionGame".id;


--
-- TOC entry 203 (class 1259 OID 16396)
-- Name: Game; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Game" (
    id integer NOT NULL,
    "isUserCreated" boolean NOT NULL,
    "identifierID" text NOT NULL,
    name text,
    year smallint,
    description text,
    "imgFileName" text,
    "minAge" smallint,
    "minPlaytime" smallint,
    "maxPlaytime" smallint,
    publisher text,
    "minPlayers" smallint,
    "maxPlayers" smallint
);


--
-- TOC entry 213 (class 1259 OID 16468)
-- Name: GameCategory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."GameCategory" (
    id integer NOT NULL,
    "gameID" bigint NOT NULL,
    "categoryID" bigint NOT NULL
);


--
-- TOC entry 211 (class 1259 OID 16457)
-- Name: GameCategorySelect; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."GameCategorySelect" (
    id integer NOT NULL,
    category text NOT NULL,
    "identifierID" text
);


--
-- TOC entry 210 (class 1259 OID 16455)
-- Name: GameCategorySelect_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."GameCategorySelect_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2929 (class 0 OID 0)
-- Dependencies: 210
-- Name: GameCategorySelect_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."GameCategorySelect_id_seq" OWNED BY public."GameCategorySelect".id;


--
-- TOC entry 212 (class 1259 OID 16466)
-- Name: GameCategory_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."GameCategory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2930 (class 0 OID 0)
-- Dependencies: 212
-- Name: GameCategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."GameCategory_id_seq" OWNED BY public."GameCategory".id;


--
-- TOC entry 202 (class 1259 OID 16394)
-- Name: Game_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Game_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2931 (class 0 OID 0)
-- Dependencies: 202
-- Name: Game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Game_id_seq" OWNED BY public."Game".id;


--
-- TOC entry 215 (class 1259 OID 16486)
-- Name: Review; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Review" (
    id integer NOT NULL,
    "userID" bigint NOT NULL,
    "gameID" bigint NOT NULL,
    "overallRating" smallint,
    comments text,
    "strategy" smallint,
    "luck" smallint,
    "playerInteraction" smallint,
    "replayValue" smallint,
    "complexity" smallint,
    "artAndStyle" smallint,
    "gfKids" boolean,
    "gfTeens" boolean,
    "gfAdults" boolean,
    "gfFamilies" boolean,
    "gf2Player" boolean,
    "gfLargeGroups" boolean,
    "gfSocialDistancing" boolean
);


--
-- TOC entry 214 (class 1259 OID 16484)
-- Name: Review_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Review_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2934 (class 0 OID 0)
-- Dependencies: 214
-- Name: Review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Review_id_seq" OWNED BY public."Review".id;


--
-- TOC entry 205 (class 1259 OID 16407)
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "imgFileName" text
);


--
-- TOC entry 207 (class 1259 OID 16418)
-- Name: UserCollection; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UserCollection" (
    id integer NOT NULL,
    "userID" bigint NOT NULL,
    name text NOT NULL,
    "isPrivate" boolean NOT NULL
);


--
-- TOC entry 206 (class 1259 OID 16416)
-- Name: UserCollection_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."UserCollection_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2935 (class 0 OID 0)
-- Dependencies: 206
-- Name: UserCollection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."UserCollection_id_seq" OWNED BY public."UserCollection".id;


--
-- TOC entry 204 (class 1259 OID 16405)
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2936 (class 0 OID 0)
-- Dependencies: 204
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- TOC entry 2744 (class 2604 OID 16437)
-- Name: CollectionGame id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CollectionGame" ALTER COLUMN id SET DEFAULT nextval('public."CollectionGame_id_seq"'::regclass);


--
-- TOC entry 2741 (class 2604 OID 16399)
-- Name: Game id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Game" ALTER COLUMN id SET DEFAULT nextval('public."Game_id_seq"'::regclass);


--
-- TOC entry 2746 (class 2604 OID 16471)
-- Name: GameCategory id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GameCategory" ALTER COLUMN id SET DEFAULT nextval('public."GameCategory_id_seq"'::regclass);


--
-- TOC entry 2745 (class 2604 OID 16460)
-- Name: GameCategorySelect id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GameCategorySelect" ALTER COLUMN id SET DEFAULT nextval('public."GameCategorySelect_id_seq"'::regclass);


--
-- TOC entry 2747 (class 2604 OID 16489)
-- Name: Review id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Review" ALTER COLUMN id SET DEFAULT nextval('public."Review_id_seq"'::regclass);


--
-- TOC entry 2742 (class 2604 OID 16410)
-- Name: User id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- TOC entry 2743 (class 2604 OID 16421)
-- Name: UserCollection id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserCollection" ALTER COLUMN id SET DEFAULT nextval('public."UserCollection_id_seq"'::regclass);


--
-- TOC entry 2910 (class 0 OID 16434)
-- Dependencies: 209
-- Data for Name: CollectionGame; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."CollectionGame" (id, "userColllectionID", "gameID") FROM stdin;
\.

--
-- TOC entry 2893 (class 0 OID 16396)
-- Dependencies: 203
-- Data for Name: Game; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Game" (id, "isUserCreated", "identifierID", name, year, description, "imgFileName", "minAge", "minPlaytime", "maxPlaytime", publisher) FROM stdin;
\.


--
-- TOC entry 2914 (class 0 OID 16468)
-- Dependencies: 213
-- Data for Name: GameCategory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."GameCategory" (id, "gameID", "categoryID") FROM stdin;
\.


--
-- TOC entry 2912 (class 0 OID 16457)
-- Dependencies: 211
-- Data for Name: GameCategorySelect; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."GameCategorySelect" (id, category, "identifierID") FROM stdin;
\.


--
-- TOC entry 2916 (class 0 OID 16486)
-- Dependencies: 215
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Review" (id, "userID", "gameID", "overallRating", comments) FROM stdin;
\.

--
-- TOC entry 2906 (class 0 OID 16407)
-- Dependencies: 205
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."User" (id, username, password, "imgFileName") FROM stdin;
\.


--
-- TOC entry 2908 (class 0 OID 16418)
-- Dependencies: 207
-- Data for Name: UserCollection; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."UserCollection" (id, "userID", name, "isPrivate") FROM stdin;
\.


--
-- TOC entry 2937 (class 0 OID 0)
-- Dependencies: 208
-- Name: CollectionGame_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."CollectionGame_id_seq"', 1, false);


--
-- TOC entry 2938 (class 0 OID 0)
-- Dependencies: 210
-- Name: GameCategorySelect_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."GameCategorySelect_id_seq"', 1, false);


--
-- TOC entry 2939 (class 0 OID 0)
-- Dependencies: 212
-- Name: GameCategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."GameCategory_id_seq"', 264, true);


--
-- TOC entry 2940 (class 0 OID 0)
-- Dependencies: 202
-- Name: Game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Game_id_seq"', 102, true);

--
-- TOC entry 2943 (class 0 OID 0)
-- Dependencies: 214
-- Name: Review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Review_id_seq"', 1, false);


--
-- TOC entry 2944 (class 0 OID 0)
-- Dependencies: 206
-- Name: UserCollection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."UserCollection_id_seq"', 1, false);


--
-- TOC entry 2945 (class 0 OID 0)
-- Dependencies: 204
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."User_id_seq"', 1, false);


--
-- TOC entry 2757 (class 2606 OID 16439)
-- Name: CollectionGame CollectionGame_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CollectionGame"
    ADD CONSTRAINT "CollectionGame_pkey" PRIMARY KEY (id);


--
-- TOC entry 2759 (class 2606 OID 16465)
-- Name: GameCategorySelect GameCategorySelect_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GameCategorySelect"
    ADD CONSTRAINT "GameCategorySelect_pkey" PRIMARY KEY (id);


--
-- TOC entry 2761 (class 2606 OID 16473)
-- Name: GameCategory GameCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GameCategory"
    ADD CONSTRAINT "GameCategory_pkey" PRIMARY KEY (id);


--
-- TOC entry 2751 (class 2606 OID 16404)
-- Name: Game Game_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Game"
    ADD CONSTRAINT "Game_pkey" PRIMARY KEY (id);


--
-- TOC entry 2763 (class 2606 OID 16491)
-- Name: Review Review_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (id);


--
-- TOC entry 2755 (class 2606 OID 16426)
-- Name: UserCollection UserCollection_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserCollection"
    ADD CONSTRAINT "UserCollection_pkey" PRIMARY KEY (id);


--
-- TOC entry 2753 (class 2606 OID 16415)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 2770 (class 2606 OID 16445)
-- Name: CollectionGame CollectionGame_gameID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CollectionGame"
    ADD CONSTRAINT "CollectionGame_gameID_fkey" FOREIGN KEY ("gameID") REFERENCES public."Game"(id);


--
-- TOC entry 2769 (class 2606 OID 16440)
-- Name: CollectionGame CollectionGame_userColllectionID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CollectionGame"
    ADD CONSTRAINT "CollectionGame_userColllectionID_fkey" FOREIGN KEY ("userColllectionID") REFERENCES public."UserCollection"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2772 (class 2606 OID 16479)
-- Name: GameCategory GameCategory_categoryID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GameCategory"
    ADD CONSTRAINT "GameCategory_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES public."GameCategorySelect"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2771 (class 2606 OID 16474)
-- Name: GameCategory GameCategory_gameID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GameCategory"
    ADD CONSTRAINT "GameCategory_gameID_fkey" FOREIGN KEY ("gameID") REFERENCES public."Game"(id) ON UPDATE CASCADE ON DELETE CASCADE;

--
-- TOC entry 2774 (class 2606 OID 16497)
-- Name: Review Review_gameID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_gameID_fkey" FOREIGN KEY ("gameID") REFERENCES public."Game"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2773 (class 2606 OID 16492)
-- Name: Review Review_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_userID_fkey" FOREIGN KEY ("userID") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2768 (class 2606 OID 16450)
-- Name: UserCollection UserCollection_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserCollection"
    ADD CONSTRAINT "UserCollection_userID_fkey" FOREIGN KEY ("userID") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


-- Completed on 2020-07-11 17:33:55

--
-- PostgreSQL database dump complete
--

