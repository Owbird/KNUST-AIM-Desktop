export namespace models {
	
	export class ContactUserData {
	    school_email: string;
	    personal_email: string;
	    knust_mobile: string;
	    personal_mobile: string;
	    alt_personal_mobile: string;
	    postal_address: string;
	    residential_address: string;
	
	    static createFrom(source: any = {}) {
	        return new ContactUserData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.school_email = source["school_email"];
	        this.personal_email = source["personal_email"];
	        this.knust_mobile = source["knust_mobile"];
	        this.personal_mobile = source["personal_mobile"];
	        this.alt_personal_mobile = source["alt_personal_mobile"];
	        this.postal_address = source["postal_address"];
	        this.residential_address = source["residential_address"];
	    }
	}
	export class GetResultsPayload {
	    year: string;
	    sem: string;
	
	    static createFrom(source: any = {}) {
	        return new GetResultsPayload(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.year = source["year"];
	        this.sem = source["sem"];
	    }
	}
	export class ResultsSummaryExtra {
	    semester: string;
	    cumulative: string;
	
	    static createFrom(source: any = {}) {
	        return new ResultsSummaryExtra(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.semester = source["semester"];
	        this.cumulative = source["cumulative"];
	    }
	}
	export class ResultsSummary {
	    credits_registered: ResultsSummaryExtra;
	    credits_obtained: ResultsSummaryExtra;
	    credits_calculated: ResultsSummaryExtra;
	    weighted_marks: ResultsSummaryExtra;
	    cwa: ResultsSummaryExtra;
	
	    static createFrom(source: any = {}) {
	        return new ResultsSummary(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.credits_registered = this.convertValues(source["credits_registered"], ResultsSummaryExtra);
	        this.credits_obtained = this.convertValues(source["credits_obtained"], ResultsSummaryExtra);
	        this.credits_calculated = this.convertValues(source["credits_calculated"], ResultsSummaryExtra);
	        this.weighted_marks = this.convertValues(source["weighted_marks"], ResultsSummaryExtra);
	        this.cwa = this.convertValues(source["cwa"], ResultsSummaryExtra);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Results {
	    course_code: string;
	    course_name: string;
	    credits: string;
	    grade: string;
	    total_mark: string;
	
	    static createFrom(source: any = {}) {
	        return new Results(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.course_code = source["course_code"];
	        this.course_name = source["course_name"];
	        this.credits = source["credits"];
	        this.grade = source["grade"];
	        this.total_mark = source["total_mark"];
	    }
	}
	export class ResultsPersonalData {
	    name: string;
	    sem: string;
	    year: string;
	    indexNo: string;
	    programme: string;
	    studentId: string;
	    date: string;
	    option: string;
	    username: string;
	
	    static createFrom(source: any = {}) {
	        return new ResultsPersonalData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.sem = source["sem"];
	        this.year = source["year"];
	        this.indexNo = source["indexNo"];
	        this.programme = source["programme"];
	        this.studentId = source["studentId"];
	        this.date = source["date"];
	        this.option = source["option"];
	        this.username = source["username"];
	    }
	}
	export class GetResultsResponse {
	    message: string;
	    personal_data: ResultsPersonalData;
	    results: Results[];
	    summary: ResultsSummary;
	    trails: string[];
	
	    static createFrom(source: any = {}) {
	        return new GetResultsResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.message = source["message"];
	        this.personal_data = this.convertValues(source["personal_data"], ResultsPersonalData);
	        this.results = this.convertValues(source["results"], Results);
	        this.summary = this.convertValues(source["summary"], ResultsSummary);
	        this.trails = source["trails"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class KNUSTServer {
	    status: string;
	    url: string;
	
	    static createFrom(source: any = {}) {
	        return new KNUSTServer(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.status = source["status"];
	        this.url = source["url"];
	    }
	}
	export class News {
	    title: string;
	    description: string;
	    date: string;
	    category: string;
	    slug: string;
	    featured_image: string;
	
	    static createFrom(source: any = {}) {
	        return new News(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.title = source["title"];
	        this.description = source["description"];
	        this.date = source["date"];
	        this.category = source["category"];
	        this.slug = source["slug"];
	        this.featured_image = source["featured_image"];
	    }
	}
	export class NewsDetailsContent {
	    type: string;
	    value: string;
	
	    static createFrom(source: any = {}) {
	        return new NewsDetailsContent(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.type = source["type"];
	        this.value = source["value"];
	    }
	}
	export class NewsDetails {
	    tile: string;
	    featured_image: string;
	    date: string;
	    source: string;
	    read_time: number;
	    content: NewsDetailsContent[];
	
	    static createFrom(source: any = {}) {
	        return new NewsDetails(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.tile = source["tile"];
	        this.featured_image = source["featured_image"];
	        this.date = source["date"];
	        this.source = source["source"];
	        this.read_time = source["read_time"];
	        this.content = this.convertValues(source["content"], NewsDetailsContent);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class PersonalUserData {
	    username: string;
	    surname: string;
	    other_names: string;
	    gender: string;
	    date_of_birth: string;
	    country: string;
	    region: string;
	    religion: string;
	
	    static createFrom(source: any = {}) {
	        return new PersonalUserData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.username = source["username"];
	        this.surname = source["surname"];
	        this.other_names = source["other_names"];
	        this.gender = source["gender"];
	        this.date_of_birth = source["date_of_birth"];
	        this.country = source["country"];
	        this.region = source["region"];
	        this.religion = source["religion"];
	    }
	}
	export class ProgrammeUserData {
	    studentId: string;
	    indexNo: string;
	    programme_stream: string;
	
	    static createFrom(source: any = {}) {
	        return new ProgrammeUserData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.studentId = source["studentId"];
	        this.indexNo = source["indexNo"];
	        this.programme_stream = source["programme_stream"];
	    }
	}
	
	
	export class ResultsSelection {
	    years: string[];
	    sems: string[];
	
	    static createFrom(source: any = {}) {
	        return new ResultsSelection(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.years = source["years"];
	        this.sems = source["sems"];
	    }
	}
	
	
	export class UserAuthPayload {
	    username: string;
	    password: string;
	    studentId: string;
	
	    static createFrom(source: any = {}) {
	        return new UserAuthPayload(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.username = source["username"];
	        this.password = source["password"];
	        this.studentId = source["studentId"];
	    }
	}
	export class UserData {
	    personal: PersonalUserData;
	    programme: ProgrammeUserData;
	    contact: ContactUserData;
	
	    static createFrom(source: any = {}) {
	        return new UserData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.personal = this.convertValues(source["personal"], PersonalUserData);
	        this.programme = this.convertValues(source["programme"], ProgrammeUserData);
	        this.contact = this.convertValues(source["contact"], ContactUserData);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

