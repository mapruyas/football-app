import { Field, InputType } from "@nestjs/graphql";

@InputType()
export default class CompetitionInput {
    @Field()
    readonly code: string;

    @Field()
    readonly externalId: number;

    @Field()
    readonly name: string;

    @Field()
    readonly areaName: string;
}
